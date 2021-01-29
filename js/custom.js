// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {

    // hide results
    document.getElementById('results').style.display = 'none';

    // show loading
    document.getElementById('loading').style.display = 'block';

    // calculate results after 2 seconds
    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

// Calculate Results
function calculateResults() {

    // input variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    // result variables
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // monthlypayment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    // finite number: number that can be measured, or given a value

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);


        // show results
        document.getElementById('results').style.display = 'block';

        // hide loading gif
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

// show Error
function showError(error) {
    // hide results
    document.getElementById('results').style.display = 'none';

    // hide loading gif
    document.getElementById('loading').style.display = 'none';

    // get card 
    const card = document.querySelector('.card');
    const heading = document.querySelector('.card-body');

    // create div
    const errorDiv = document.createElement('div');

    // add class
    errorDiv.className = 'bs_alert bs_alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    // console.log(errorDiv);  -> <div class="bs_alert bs_alert-danger">Please check your numbers</div>

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 2secs
    setTimeout(clearError, 2000);
}

function clearError() {
    document.querySelector('.bs_alert').remove();
}