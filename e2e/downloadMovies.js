describe("download movies", () => {
  it("download movies", async () => {
    await element(by.id("downloadMoviesButton")).tap()
    await element(by.id("movieLink3")).tap()
  })
})
