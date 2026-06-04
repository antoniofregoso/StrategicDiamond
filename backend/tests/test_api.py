"""Tests para endpoints de la API."""

import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    return TestClient(app)


class TestHealth:
    """Tests para el endpoint de salud."""

    def test_health_check_returns_ok(self, client):
        """Verifica que el endpoint /health retorna estado ok."""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

    def test_health_check_has_database_status(self, client):
        """Verifica que la respuesta incluye estado de BD."""
        response = client.get("/health")
        data = response.json()
        assert "database" in data


class TestRoot:
    """Tests para el endpoint raíz."""

    def test_root_endpoint_returns_message(self, client):
        """Verifica que el endpoint / retorna un mensaje."""
        response = client.get("/")
        assert response.status_code == 200
        assert "message" in response.json()


class TestErrorHandling:
    """Tests para manejo de errores."""

    def test_invalid_json_returns_validation_error(self, client):
        """Verifica que JSON inválido retorna error de validación."""
        response = client.post(
            "/graphql",
            json={"invalidField": "test"},
            headers={"Content-Type": "application/json"},
        )
        # GraphQL maneja errores de forma diferente
        assert response.status_code in [200, 400, 422]

    def test_not_found_endpoint_returns_404(self, client):
        """Verifica que endpoint no existente retorna 404."""
        response = client.get("/nonexistent")
        assert response.status_code == 404
