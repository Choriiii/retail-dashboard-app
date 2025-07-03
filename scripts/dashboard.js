
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('dashboard-chart')) return;
    
    loadDashboardData();
});

async function loadDashboardData() {
    try {
        const [productsResponse, salesResponse] = await Promise.all([
            fetch('../productData.json'),
        ]);
        
        const products = await productsResponse.json();
        const sales = await salesResponse.json();
        
        renderSalesChart(sales);
        renderProductPerformance(products);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function renderSalesChart(salesData) {
    const ctx = document.getElementById('sales-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.map(item => item.month),
            datasets: [{
                label: 'Sales',
                data: salesData.map(item => item.amount),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Sales'
                }
            }
        }
    });
}

function renderProductPerformance(products) {
    const topProducts = [...products]
        .sort((a, b) => (b.sales || 0) - (a.sales || 0))
        .slice(0, 5);
    
    const ctx = document.getElementById('products-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topProducts.map(product => product.name),
            datasets: [{
                label: 'Sales',
                data: topProducts.map(product => product.sales || 0),
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Top Selling Products'
                }
            }
        }
    });
}