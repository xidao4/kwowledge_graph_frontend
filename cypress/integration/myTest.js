describe('My First Test', () => {
  it('上传文件', () => {
    cy.visit('http://localhost:8080/#/')
    cy.wait(10000)
  })
  it('增加实体',()=>{
    cy.contains('增加节点').click()
    console.log(cy.get('.ant-input'))
    cy.get("input[maxLength='15']").type('123456')
    cy.get("button[class='ant-btn ant-btn-primary']").click()
  })
  it('增加关系', () => {
    cy.get(".ant-select-selection__rendered").eq(0).click()// 点击选择框，并选择第一项
    cy.get("li[unselectable='on']").first().click()
    cy.get(".ant-select-selection__rendered").eq(1).click()// 点击选择框，并选择第一项
    cy.get("li[unselectable='on']").eq(8).click()
    cy.get(".ant-select-selection__rendered").eq(2).click()// 点击选择框，并选择第一项
    cy.get("li[unselectable='on']").eq(10).click()
    cy.get("input[placeholder='请输入关系值']").type('关系1')
    cy.get("button[class='ant-btn ant-btn-primary ant-btn-sm']").click()
  })
})