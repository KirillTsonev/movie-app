describe("e2e test", () => {
	it("home page", () => {
		cy.visit("http://localhost:3000/");

		cy.get(".css-1we5rma").should("have.length", 10);
		cy.wait(500);
		cy.contains("Details").click();

		cy.contains("Release date");
		cy.wait(500);
		cy.contains("Close").click();
		cy.wait(500);
		cy.contains("Load more").click();

		cy.get(".css-1we5rma").should("have.length", 20);
		cy.wait(500);
		cy.contains("Load more").click();

		cy.get(".css-1we5rma").should("have.length", 30);
		cy.wait(500);
		cy.get(".css-ct6icl").click();

		cy.window().its("scrollY").should("equal", 0);
		cy.wait(500);
		cy.contains("Your collections").click();

		cy.contains("You don't have any movies");
		cy.wait(500);
		cy.contains("Watchlist").click();

		cy.contains("You don't have any movies");
		cy.wait(500);
		cy.contains("Rated").click();

		cy.contains("You don't have any movies");
		cy.wait(500);
		cy.contains("All movies").click();
		cy.wait(500);
		cy.contains("Toggle").click();
		cy.wait(500);
		cy.get(".css-1xga0a3").type("electric boogaloo");
		cy.wait(500);
		cy.get(".css-y7zgko").last().click();
		cy.wait(500);
		cy.contains("Details").click();
		cy.wait(500);
		cy.contains("Close").click();
		cy.wait(500);
		cy.get(".css-18tdw1x").get("svg").first().click();
		cy.wait(500);
		cy.contains("Complex search").click();
		cy.wait(500);
		cy.get(".css-164n2bl").click();
		cy.wait(500);
		cy.get(".css-1a4dqdj").first().click();
		cy.wait(500);
		cy.get(".css-1m8jyeq").type("bruce willis");
		cy.wait(500);
		cy.get(".css-i5jo8w").type("1988");
		cy.wait(500);
		cy.get(".css-y7zgko").first().click();
		cy.wait(500);
		cy.contains("Details").click();
		cy.wait(500);
		cy.contains("Close").click();
		cy.wait(500);
		cy.get(".css-18tdw1x").get("svg").eq(1).click();
		cy.wait(500);
		cy.contains("Clear search").click();
		cy.wait(500);
		cy.contains("Complex search").click();
		cy.wait(500);
		cy.get(".css-1m8jyeq").type("pacino, reeves");
		cy.wait(500);
		cy.get(".css-y7zgko").first().click();
		cy.wait(500);
		cy.get(".css-18tdw1x").get("svg").eq(2).click();
		cy.wait(500);
		cy.get(".star").eq(4).click();
		cy.wait(500);
		cy.contains("Your collections").click();

		cy.get(".css-1we5rma").should("have.length", 1);
		cy.wait(500);
		cy.contains("Watchlist").click();

		cy.get(".css-1we5rma").should("have.length", 1);
		cy.wait(500);
		cy.contains("Rated").click();

		cy.get(".css-1we5rma").should("have.length", 1);
	});
});
