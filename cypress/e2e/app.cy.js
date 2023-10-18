describe("app", () => {
  it("fetches the current temperature and converts it", () => {
    cy.visit("/")

    cy.findByLabelText("From").select("Celsius")
    cy.findByLabelText("To").select("Kelvin")

    cy.findByText(/(\d*\.\d*) K/)
  })

  it("fetches the current temperature through our ip address", () => {
    // usuario visita página --> petición http backend '/temperature' --> fetch de posición --> fetch de temperatura --> UI cambia al recibir la temperatura
    cy.visit("/")

    cy.intercept("GET", "/temperature", req => {
      req.headers = { "x-forwarded-for": "1.178.255.255" }
      req.continue()
    })

    cy.intercept({
      url: "http://ip-api.com/json/1.178.255.255",
    }).as("positionFetch")

    cy.wait("@positionFetch")

    cy.intercept({
      https: true,
      hostname: "api.open-meteo.com",
      path: "/v1/forecast",
    }).as("temperatureFetch")

    cy.wait("@temperatureFetch").then(intercept =>
      intercept.response.send({ temperature: 24 })
    )

    cy.findByText("Current temperature is  ºC")
  })
})
