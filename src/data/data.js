const data = [
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 2,
    question: 'Do you know the No. 1 thing you/your business is great at?',
  },
  {
    category_id: 2,
    category_name: 'Develop your why',
    serial_number: 3,
    question: 'Do you know the No. 1 thing that you/your business is passionate about?',
  },
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 4,
    question: 'Do you know the No. 1 KPI that drives your business?',
  },
  {
    category_id: 7,
    category_name: 'Leadership & Culture Development',
    serial_number: 5,
    question:
      'If you had to start from scratch would you rehire everybody on your supervisor/management team?',
  },
  {
    category_id: 7,
    category_name: 'Leadership & Culture Development',
    serial_number: 6,
    question: 'Are your supervisors and managers highly capable?',
  },
  {
    category_id: 7,
    category_name: 'Leadership & Culture Development',
    serial_number: 7,
    question: 'Do your managers share their knowledge freely with team members?',
  },
  {
    category_id: 7,
    category_name: 'Leadership & Culture Development',
    serial_number: 8,
    question:
      'Do your managers organise their groups effectively to achieve their teams goals and objectives?',
  },
  {
    category_id: 7,
    category_name: 'Leadership & Culture Development',
    serial_number: 9,
    question:
      'Do your managers organise their groups effectivley to galvanise a department or division to achieve their goals?',
  },
  {
    category_id: 7,
    category_name: 'Leadership & Culture Development',
    serial_number: 10,
    question: 'Do your managers show humility? Are they humble? Do they admit they make mistakes?',
  },
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 11,
    question:
      'Has your team agreed on 1 big goal that you are striving to achieve over the next 15-20 years?',
  },
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 12,
    question: 'Do you conduct an annual strategic planning workshop?',
  },
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 13,
    question: 'Do you review your strategic plan quartlerly?',
  },
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 14,
    question: 'Do you communicate your strategic plan with the wider organisation?',
  },
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 15,
    question:
      'Do you have a strategic plan roadmap, a document that outlines how you will achieve your strategic plan?',
  },
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 16,
    question: 'Could your team articulate what success looks like as an organisation?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 17,
    question: 'Could your team articulate your business values?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 18,
    question: 'Are your values posted around the organisation?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 19,
    question: 'Have you created a set of beliefs for the business and shared them with the team?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 20,
    question:
      'Have you created a set of leadership principles that govern how your manage team is to manage the business?',
  },
  {
    category_id: 2,
    category_name: 'Develop your why',
    serial_number: 21,
    question:
      'Could your staff articulate your "Why" or "Purpose" as an organisation? The No.1 reason why the business was created in the first place?',
  },
  {
    category_id: 2,
    category_name: 'Develop your why',
    serial_number: 22,
    question: 'Is your "Why" messaging intergrated into your marketing collateral?',
  },
  {
    category_id: 4,
    category_name: 'Sales team effectiveness',
    serial_number: 23,
    question: 'Could your team articulate your "Unique Selling Point" or "Points of Difference"',
  },
  {
    category_id: 4,
    category_name: 'Sales team effectiveness',
    serial_number: 24,
    question: 'Could your team articulate your brand promise?',
  },
  {
    category_id: 4,
    category_name: 'Sales team effectiveness',
    serial_number: 25,
    question: 'Could your team recite your elevator pitch or statement?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 26,
    question:
      'Do you have a weekly management meeting where you discuss the most importance tasks to be completed that week?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 27,
    question:
      'Do you have a short daily meeting to agree the most important tasks to be completed that day?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 28,
    question: 'Do you post around the business the 1-3 big goals for the quarter?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 29,
    question: 'Do you reward your team for achieving the 1-3 big goals for the quarter?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 30,
    question:
      'Does every key area of the business have someone assigned to it to ensure goals are met?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 31,
    question: 'Is your management team aligned with your strategy?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 32,
    question: 'Do you conduct regular employee surveys and relay the feedback to your employees?',
  },
  {
    category_id: 4,
    category_name: 'Sales team effectiveness',
    serial_number: 33,
    question: 'Do you conduct regular customer surveys and relay the feedback to your customers?',
  },
  {
    category_id: 4,
    category_name: 'Sales team effectiveness',
    serial_number: 34,
    question: 'Can your management team describe your ideal customer in 20 words or less?',
  },
  {
    category_id: 4,
    category_name: 'Sales team effectiveness',
    serial_number: 35,
    question:
      "Could your team describe your clients' typical emotional state when it comes to buying your product or service?",
  },
  {
    category_id: 4,
    category_name: 'Sales team effectiveness',
    serial_number: 36,
    question:
      'Could your team articulate what your client is really looking for when they buy your product or service?',
  },
  {
    category_id: 5,
    category_name: 'BI Tools',
    serial_number: 37,
    question: 'Do you maintain a sales pipeline tracker tool?',
  },
  {
    category_id: 5,
    category_name: 'BI Tools',
    serial_number: 38,
    question: 'Do you track your lead conversion rate?',
  },
  {
    category_id: 8,
    category_name: 'Governance & Accountability',
    serial_number: 39,
    question:
      'Do you meet monthly with your advisory board, executive or management team to review financial and operational performance?',
  },
  {
    category_id: 5,
    category_name: 'BI Tools',
    serial_number: 40,
    question: 'Do you track gross profit by customer/project and by product/service?',
  },
  {
    category_id: 5,
    category_name: 'BI Tools',
    serial_number: 41,
    question: 'Do you track revenue/sales per person per month?',
  },
  {
    category_id: 8,
    category_name: 'Governance & Accountability',
    serial_number: 42,
    question: 'After every meeting, do you capture who has agreed to do what and by when?',
  },
  {
    category_id: 8,
    category_name: 'Governance & Accountability',
    serial_number: 43,
    question:
      'Have you distributed an authority matrix across the business showing who has authority to make decisions, purchases and at what level?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 44,
    question:
      'Do you spend time with your executive or management team at least once a month to discuss strategic initiatives?',
  },
  {
    category_id: 6,
    category_name: 'WC Mananagement',
    serial_number: 45,
    question: 'Do you maintain a rolling 13 week cash flow forecast?',
  },
  {
    category_id: 6,
    category_name: 'WC Mananagement',
    serial_number: 46,
    question: 'Do you know how long your working capital cycle is in days?',
  },
  {
    category_id: 6,
    category_name: 'WC Mananagement',
    serial_number: 47,
    question: 'Do you maintain a 3 way financial forecast and update it at least quarterly?',
  },
  {
    category_id: 1,
    category_name: 'Strategy',
    serial_number: 48,
    question: 'Is your biggest customer less than 25% of your sales/revenue?',
  },
  {
    category_id: 5,
    category_name: 'BI Tools',
    serial_number: 49,
    question:
      'Does your management team know what revenue/sales you need to achieve each month to breakeven?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 50,
    question: 'Have you distributed an organisational chart to your staff?',
  },
  {
    category_id: 3,
    category_name: 'Habits for success',
    serial_number: 51,
    question: 'Have you distributed position descriptions to your supervisors/managers?',
  },
]
const unique = [...new Set(data.map((item) => item.category_id))]
const categoryData = []

unique.forEach((categoryId) => {
  const obj = data.find((o) => o.category_id === categoryId)
  const items = data.filter((o) => o.category_id === categoryId)
  categoryData.push({ id: categoryId, title: obj.category_name, questionsCount: items.length })
})

let dashboardData = []
dashboardData = unique.forEach((categoryId) => {
  const obj = data.find((o) => o.category_id === categoryId)
  dashboardData.push(obj.category_name)
})

export { categoryData }
export { dashboardData }
export default data
