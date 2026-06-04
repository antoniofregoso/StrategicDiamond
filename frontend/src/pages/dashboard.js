export function dashboard(req, router){
    const userId = req.params?.id || 'user';
    document.getElementById('app').innerHTML = `
    <h1>Dashboard</h1>
    <p>Welcome ${userId} to the dashboard!</p>
    `;
}