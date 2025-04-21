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
  await page.goto('https://www.ugajobsearch.com/postings/search', {
    waitUntil: 'networkidle2',
  });

  await page.waitForSelector('.job-item-posting');
 
  const { validJobs, brokenJobs } = await page.evaluate(() => {
    const jobElements = Array.from(document.querySelectorAll('.job-item-posting'));

    const validJobs: any[] = [];
    const brokenJobs: any[] = [];

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
        validJobs.push(job);
      } else {
        brokenJobs.push(job);
      }
    });
    return { validJobs, brokenJobs };
  });

  console.log('First scraped job:', validJobs[0]);

  await browser.close();
  return { validJobs, brokenJobs };
}
