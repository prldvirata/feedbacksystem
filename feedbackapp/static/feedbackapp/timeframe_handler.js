export let feedback_table;
let feedbacks;
export async function initDashboard() {
  // NOTE: function initializes the dashboard with the default timeline by reaching out 
  // to the API then re-rendering with data
  const default_start = new Date();
  let default_end= new Date();
  default_start.setDate(default_end.getDate()-300);
  const start_date_str=default_start.toISOString().slice(0,10);
  const end_date_str=default_end.toISOString().slice(0,10);
  feedbacks=await fetchData(start_date_str,end_date_str)
  console.log(feedbacks)
  populateDataTable(feedbacks)
  updateDashboardAnalysis()
}
export function updateDashboardAnalysis() {
  // NOTE: function updates dashboard charts & summary cards by calling relevant functions 
  if (!feedback_table) {
    alert('DataTable not initialized yet for analysis.');
    return;
  }
  const filteredData = feedback_table.rows({search: 'applied'}).data().toArray()
  const unfilteredData = feedback_table.rows().data().toArray()
  const filteredData_analysis = analyze(filteredData)
  const unfilteredData_analysis = analyze(unfilteredData)
  updateRatingsChart()
  updateCategoriesChart()
}
function analyze(data) {
  const result = {
    lunch: {
      total_reviews: 0,
      overall_ratings_count: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      recommended_count: 0,
      total_overall_rating: 0,
      total_cleanliness_rating: 0,
      total_service_rating: 0,
      total_food_rating: 0,
      total_ambience_rating: 0,
    },
    dinner: {
      total_reviews: 0,
      overall_ratings_count: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      recommended_count: 0,
      total_overall_rating: 0,
      total_cleanliness_rating: 0,
      total_service_rating: 0,
      total_food_rating: 0,
      total_ambience_rating: 0,
    },
  }

async function renderDashboard(){

  // NOTE: function updates dashboard charts & summary cards by calling relevant functions 

  const start_date=document.getElementById('start_date').value;
  const end_date=document.getElementById('end_date').value;
  console.log(`start_date: ${start_date}\nend_date: ${end_date}`)
  feedbacks=await fetchData(start_date,end_date)
  console.log(feedbacks)
  populateDataTable(feedbacks)
  updateDashboardAnalysis(feedbacks)
}
function populateDataTable(feedbacks){
  // NOTE: populates the dataTable after recieveing data from fetchData
  if (feedback_table) {
    // If the DataTable instance already exists, update its data
    feedback_table.clear().rows.add(feedbacks).draw();
  } else {
    //create the DataTable.
    feedback_table = new DataTable('#feedback_table', {
      data: feedbacks,
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      columns: [
        { data: 'id', title: 'ID', visible: false },
        { data: 'name', title: 'Name', defaultContent: 'Anonymous' },
        { data: 'visit_date', title: 'Visit Date' },
        { data: 'food_rating', title: 'Food' },//0+3
        { data: 'cleanliness_rating', title: 'Cleanliness' },//1+3
        { data: 'service_rating', title: 'Service' },//2+3
        { data: 'ambience_rating', title: 'Ambience' },//3+3
        { data: 'overall_rating', title: 'Overall' },//4+3
        { data: 'recommendation', title: 'Recommend?' },
        { data: 'suggestions', title: 'suggestions' , visible: false},
        { data: 'comment', title: 'comment' , visible: false},
        { data: 'visit_time', title: 'visit_time' , visible: false},
        { data: 'email', title: 'email' , visible: false},
      ],
      createdRow: function(row, data, dataIndex) {
        $(row).attr('data-bs-toggle', 'modal');
        $(row).attr('data-bs-target', '#feedbackModal');
        $(row).addClass('feedback-row');
        $(row).data('feedbackData', data);
      }
    });  
  }

}
function updateRatingsChart(data){

  // NOTE: updates horizontal chart for how much of each star rating you got.

  // TODO: write the function?
}
function updateCategoriesChart(data){
  
  // NOTE: updates vertical double bar chart for the average rating in each category

  // TODO: write the function?
  
}
async function fetchData(start_date, end_date) {
  // NOTE: retrieves data from api asynchronously.
  const url=`/feedback_api/?start_date=${start_date}&end_date=${end_date}`
  try {
    const response=await fetch(url)
    if (!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const feedbacks=await response.json();
    return feedbacks;
  } catch (error) {
    console.error(`Error fetching data: ${error}`)
    throw error
  }
  
}

