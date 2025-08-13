let feedback_table;
async function initDashboard() {
  // NOTE: function initializes the dashboard with the default timeline by reaching out 
  // to the API then re-rendering with data
  default_start = new Date();
  default_end= new Date();
  default_start.setDate(default_end.getDate()-300);
  start_date_str=default_start.toISOString().slice(0,10);
  end_date_str=default_end.toISOString().slice(0,10);
  feedbacks=await fetchData(start_date_str,end_date_str)
  console.log(feedbacks)
  populateDataTable(feedbacks)
  updateDashboardAnalysis()
}
function updateDashboardAnalysis(data) {
  // NOTE: function updates dashboard charts & summary cards by calling relevant functions 

  
  
  // TODO: write the function?

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
        { data: 'food_rating', title: 'Food' },
        { data: 'cleanliness_rating', title: 'Cleanliness' },
        { data: 'service_rating', title: 'Service' },
        { data: 'ambience_rating', title: 'Ambience' },
        { data: 'overall_rating', title: 'Overall' },
        { data: 'recommendation', title: 'Recommend?' }
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

