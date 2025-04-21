import puppeteer from 'puppeteer';

export interface ScrapedJob {
  title: string;
  department: string;
  postedDate: string;
  link: string;
  company: string;
}

export async function scrapeUGAJobs(): Promise<ScrapedJob[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.ugajobsearch.com/postings/search', {
    waitUntil: 'networkidle2',
  });

  await page.waitForSelector('.row'); // Ensure jobs have loaded

  const jobs = await page.evaluate(() => {
    const jobElements = Array.from(document.querySelectorAll('.row'));
    return jobElements.map(el => {
      const title = el.querySelector('a.title')?.textContent?.trim() || 'Untitled';
      const department = el.querySelector('.department')?.textContent?.trim() || 'N/A';
      const postedDate = el.querySelector('.posted')?.textContent?.trim() || 'N/A';
      const link = (el.querySelector('a.title') as HTMLAnchorElement)?.href || '';
      const company = department; // Fallback - Assuming department is the company name
      return { title, department, postedDate, link, company };
    });
  });

  await browser.close();
  return jobs;
}
