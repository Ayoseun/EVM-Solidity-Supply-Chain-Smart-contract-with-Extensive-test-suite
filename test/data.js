
  //Product
  let product;
  const productId = 1;
  const productName = "Louis Roederer Collection 243";
  const createdAt = ethers.encodeBytes32String("2024-04-19T12:23:00Z");
  const organizationId = 1;
  const organizationName = "Louis Roederer";
  const productUrl = "https://www.louis-roederer.com/en/wine/collection";

  let milestone;
  const milestoneId = 1;
  const milestoneName = "Fetched Grapes";
  const milestoneCreatedAt = ethers.encodeBytes32String("2024-11-19T12:23:00Z");

  const milestone2Id = 2;
  const milestone2Name = "Used Sparkling Water";
  const milestone2CreatedAt = ethers.encodeBytes32String(
    "2025-01-29T02:53:10Z"
  );

  let proofs;
  const proofId = 1;
  const proofName = "I was there";
  const evidences = '["pasdfasdf", "asdfasdfosi"]';
  const conditions =
    '[{ "type":"Temperatura", "value":"32", "unit":"ºC" }, { "type":"Tiempo", "value":"27", "unit":"segundos"}]';
  const proofCreatedAt = ethers.encodeBytes32String("2024-04-29T12:23:00Z");
  const userId = 1;

  const proof2Id = 2;
  const proof2Name = "We did not use cocacola as water";
  const evidences2 = '["very good", "very good"]';
  const conditions2 =
    '[{ "type":"Temperatura", "value":"32", "unit":"ºC" }, { "type":"Tiempo", "value":"27", "unit":"segundos"}]';
  const proof2CreatedAt = ethers.encodeBytes32String("2024-04-29T12:23:00Z");
  const user2Id = 2;

  let validation;
  const status = "OK";
  const verifierId = 1;
  const verifierName = "Julie Alvero Munsad";
  const verifiedAt = ethers.encodeBytes32String("2024-04-29T12:23:00Z");

  const status2 = "OK";
  const verifier2Id = 1;
  const verifier2Name = "Luis Alvero Munsad";
  const verifiedAt2 = ethers.encodeBytes32String("2024-06-29T12:23:00Z");