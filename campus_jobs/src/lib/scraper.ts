import puppeteer from 'puppeteer';

export interface ScrapedJob {
  title: string;
  department: string;
  postedDate: string;
  link: string;
}

export async function scrapeUGAJobs(): Promise<ScrapedJob[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.ugajobsearch.com/postings/search', {
    waitUntil: 'networkidle2',
  });

  await page.waitForSelector('#search_results');

  const jobs = await page.evaluate(() => {
    const jobElements = Array.from(document.querySelectorAll('.job-item-posting'));

    return jobElements.map(el => {
      const title = el.querySelector('h3 > a')?.textContent?.trim() || 'Untitled';
      const linkSuffix = el.querySelector('h3 > a')?.getAttribute('href') || '';
      const link = `https://www.ugajobsearch.com${linkSuffix}`;

      const department = el.querySelectorAll('.col-md-2.col-xs-12.job-title')[1]?.textContent?.trim() || 'N/A';
      const postedDate = el.querySelectorAll('.col-md-2.col-xs-12.job-title')[3]?.textContent?.trim() || 'N/A';

      return {
        title,
        department,
        postedDate,
        link,
      };
    });
  });

  console.log(jobs.slice(0, 3));

  await browser.close();
  return jobs;
}
