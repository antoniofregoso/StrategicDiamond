export function dashboard(req, router){
    let area = req.params.area || "general";
    let subarea = req.params.subarea || "overview";
    document.getElementById('app').innerHTML = `
    <h1>Dashboard</h1>
    <p>Welcome  to the dashboard!</p>
    <p>Current area: ${area}</p>
    <p>Current subarea: ${subarea}</p>
    `;
}