const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: alphabet,
        datasets: [{
            label: 'Frequency of letters',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, .7)',
                'rgba(54, 162, 235, .7)',
                'rgba(255, 206, 86, .7)',
                'rgba(75, 192, 192, .7)',
                'rgba(153, 102, 255, .7)',
                'rgba(255, 159, 64, .7)',
                'rgba(0, 139, 0, .7)',
                'rgba(255, 64, 64, .7)',
                'rgba(24, 116, 205, .7)',
                'rgba(238, 174, 14, .7)',
                'rgba(255, 127, 0, .7)',
                'rgba(65, 105, 225, .7)',
                'rgba(221, 160, 221, .7)',
                'rgba(255, 99, 132, .7)',
                'rgba(54, 162, 235, .7)',
                'rgba(255, 206, 86, .7)',
                'rgba(75, 192, 192, .7)',
                'rgba(153, 102, 255, .7)',
                'rgba(255, 159, 64, .7)',
                'rgba(0, 139, 0, .7)',
                'rgba(255, 64, 64, .7)',
                'rgba(24, 116, 205, .7)',
                'rgba(238, 174, 14, .7)',
                'rgba(255, 127, 0, .7)',
                'rgba(65, 105, 225, .7)',
                'rgba(221, 160, 221, .7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(0, 139, 0, 1)',
                'rgba(255, 64, 64, 1)',
                'rgba(24, 116, 205, 1)',
                'rgba(238, 174, 14, 1)',
                'rgba(255, 127, 0, 1)',
                'rgba(65, 105, 225, 1)',
                'rgba(221, 160, 221, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(0, 139, 0, 1)',
                'rgba(255, 64, 64, 1)',
                'rgba(24, 116, 205, 1)',
                'rgba(238, 174, 14, 1)',
                'rgba(255, 127, 0, 1)',
                'rgba(65, 105, 225, 1)',
                'rgba(221, 160, 221, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
