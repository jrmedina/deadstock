describe("Home View", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/inventory", {
      fixture: "/sampleInventory.json",
    }).as("inventory");
    cy.intercept("GET", "http://localhost:3001/api/users", {
      fixture: "/sampleUsers.json",
    }).as("users");
    cy.visit("http://localhost:3000");
  });

  it("Should render a navigation bar on load", () => {
    cy.get(".NavBar")
      .contains("DEADSTOCK")
      .get(".nav")
      .first()
      .should("have.class", "home")
      .get(".nav")
      .last()
      .should("have.class", "login");
  });

  it("Should render a search bar", () => {
    cy.get('input[type="text"]').click({ force: true }).type("cheese");
    cy.get("main").find("h2").should("contain", "no matching results!");
  });

  it("Should show recently added shoes in a Hero", () => {
    cy.get(".recent").contains("recently added:");
    cy.get(".slide").should("have.length", 5);
    cy.get(".slide")
      .first()
      .find("img")
      .should("have.attr", "alt")
      .and("equal", "Nike Dunk Low World Champ");
  });

  it("Should be able to swipe right", () => {
    cy.get(".slide");
    cy.get(".right").click();
    cy.get(".slide.active")
      .find("img")
      .should("have.attr", "alt")
      .and("equal", "Union X Air Jordan 1 Black Toe");
  });

  it("Should be able to swipe left", () => {
    cy.get(".slide");
    cy.get(".left").click();
    cy.get(".left").click();
    cy.get(".slide.active")
      .find("img")
      .should("have.attr", "alt")
      .and("equal", "NikeCraft General Purpose Shoe");
  });

  it("Should be able to change URL paths from NavBar", () => {
    cy.get(".nav.all").click();
    cy.url().should("be.equal", "http://localhost:3000/all");
    cy.get(".ListView").should("exist");
    cy.get(".nav.login").click();
    cy.url().should("be.equal", "http://localhost:3000/login");
    cy.get(".Login").should("exist");
    cy.get(".nav.home").click();
    cy.url().should("be.equal", "http://localhost:3000/");
    cy.get(".recent").should("exist");
  });

  it("Should have social links to the repository and contributor", () => {
    cy.get(".linkedinAnchor")
      .should("have.attr", "href")
      .and("equal", "https://www.linkedin.com/in/joshua-medina/");

    cy.get(".githubAnchor")
      .should("have.attr", "href")
      .and("equal", "https://github.com/jrmedina/deadstock");
  });
});
