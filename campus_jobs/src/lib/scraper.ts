import puppeteer from 'puppeteer';

export interface ScrapedJob {
  title: string;
  company: string;
  postedDate: string;
  link: string;
}

export async function scrapeUGAJobs(): Promise<{ validJobs: ScrapedJob[]; brokenJobs: ScrapedJob[] }> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const validJobs: ScrapedJob[] = [];
  const brokenJobs: ScrapedJob[] = [];

  let pageNumber = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    const url = `https://www.ugajobsearch.com/postings/search?page=${pageNumber}`;
    console.log(`Scraping ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2' });

    const { pageValidJobs, pageBrokenJobs } = await page.evaluate(() => {
      const jobElements = Array.from(document.querySelectorAll('.job-item-posting'));
      const pageValidJobs: any[] = [];
      const pageBrokenJobs: any[] = [];

      if (jobElements.length === 0) {
        return { pageValidJobs, pageBrokenJobs };
      }

      jobElements.forEach(el => {
        const anchor = el.querySelector('h3 > a');
        const title = anchor?.textContent?.trim() || 'Untitled';
        const linkSuffix = anchor?.getAttribute('href') || '';
        const link = `https://www.ugajobsearch.com${linkSuffix}`;
        const cols = el.querySelectorAll('.col-md-2.col-xs-12.job-title');
        const department = cols[1]?.textContent?.trim() || 'N/A';
        const postedDate = cols[3]?.textContent?.trim() || 'N/A';

        const job = {
          title: title || 'Untitled',
          company: department,
          postedDate,
          link,
        };

        if (title && title.length > 0) {
          pageValidJobs.push(job);
        } else {
          pageBrokenJobs.push(job);
        }
      });

      return { pageValidJobs, pageBrokenJobs };
    });

    if (pageValidJobs.length === 0) {
      hasMorePages = false;
    } else {
      validJobs.push(...pageValidJobs);
      brokenJobs.push(...pageBrokenJobs);
      pageNumber++;
    }
  }

  await browser.close();

  console.log(`Scraped ${validJobs.length} valid jobs`);
  console.log(`Scraped ${brokenJobs.length} broken jobs`);
  return { validJobs, brokenJobs };
}
