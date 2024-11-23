export const retailQueries = {
  articles: `{
    articles[] {
      title: text(selector: "h2.article-title, .post-title, h1"),
      summary: text(selector: ".article-summary, .excerpt, p"),
      content: text(selector: ".article-content, .entry-content, .content"),
      author: text(selector: ".author-name, .byline"),
      date: text(selector: ".published-date, .date"),
      category: text(selector: ".category, .tags")
    }
  }`,

  products: `{
    products[] {
      name: text(selector: ".product-title, h2"),
      price: text(selector: ".price"),
      description: text(selector: ".description, .summary"),
      features: text(selector: ".features li, .benefits li")
    }
  }`,

  resources: `{
    resources[] {
      title: text(selector: ".resource-title, h3"),
      description: text(selector: ".resource-description, .summary"),
      link: attr(selector: "a.resource-link, a", name: "href"),
      type: text(selector: ".resource-type, .format")
    }
  }`
};