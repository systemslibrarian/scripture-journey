const fs = require('fs');
const path = require('path');

const content = {
  131: {
    ot: "The LORD is on high, yet he regards the lowly; but the proud he knows from afar.",
    nt: "Sit at my right hand until I make your enemies a footstool for your feet.",
    why: "The psalmist celebrates God's supreme authority over all. Hebrews declares that Christ sits at God's right hand while His enemies are made His footstool — ultimate vindication for the risen King."
  },
  132: {
    ot: "Today, if only you would hear his voice, do not harden your hearts as you did at Meribah.",
    nt: "But encourage one another daily, as long as it is called \\\"Today,\\\" so that none of you may be hardened by sin's deceitfulness.",
    why: "The psalmist urged Israel not to harden their hearts when God speaks. Hebrews applies this urgency to every generation — today is always the day to respond to Christ."
  },
  133: {
    ot: "The LORD will rebuild Zion and appear in his glory.",
    nt: "I saw the Holy City, the new Jerusalem, coming down out of heaven from God, prepared as a bride beautifully dressed for her husband.",
    why: "The psalmist foresaw God rebuilding Zion and appearing in glory. Revelation shows the ultimate fulfillment — the new Jerusalem descending from heaven, God's dwelling place with His people forever."
  },
  134: {
    ot: "Yet he took note of their distress when he heard their cry; for their sake he remembered his covenant and out of his great love he relented.",
    nt: "He has helped his servant Israel, remembering to be merciful to Abraham and his descendants forever, just as he promised our ancestors.",
    why: "The psalmist recalled how God remembered His covenant in Israel's darkest hours. Mary's song declares that God has done it again — remembering mercy, helping Israel, fulfilling His ancient promises through Jesus."
  },
  135: {
    ot: "I am for peace; but when I speak, they are for war.",
    nt: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    why: "The psalmist longed for peace in a hostile world. Jesus offers the peace the psalmist yearned for — not the world's fragile peace, but His own unshakable peace that overcomes every conflict."
  },
  136: {
    ot: "I lift up my eyes to the mountains — where does my help come from? My help comes from the LORD, the Maker of heaven and earth.",
    nt: "For my eyes have seen your salvation, which you have prepared in the sight of all nations.",
    why: "The psalmist looked upward for help from the LORD. Simeon held the infant Jesus and declared that his eyes had seen God's salvation. The help the psalmist sought was now held in an old man's arms."
  },
  137: {
    ot: "When the LORD restored the fortunes of Zion, we were like those who dreamed. Our mouths were filled with laughter, our tongues with songs of joy.",
    nt: "So with you: Now is your time of grief, but I will see you again and you will rejoice, and no one will take away your joy.",
    why: "The psalmist celebrated the overwhelming joy of restoration after exile. Jesus promises His followers the same pattern — present grief will give way to a joy that no one can take away."
  },
  138: {
    ot: "That which has been is far from what is profound and most profound — who can find it out?",
    nt: "I will open my mouth in parables, I will utter things hidden since the creation of the world.",
    why: "The Preacher acknowledged the depths of wisdom beyond human reach. Jesus opened His mouth and revealed mysteries hidden since creation, making the profound accessible through parables and teaching."
  },
  139: {
    ot: "I will turn my hand against you; I will thoroughly purge away your dross and remove all your impurities.",
    nt: "When the Son of Man comes in his glory, and all the angels with him, he will sit on his glorious throne.",
    why: "Isaiah prophesied God purifying His people by removing all dross. Jesus revealed that He would come in glory to separate and purify — the final judgment that removes every impurity from God's kingdom."
  },
  140: {
    ot: "In that day the Branch of the LORD will be beautiful and glorious, and the fruit of the land will be the pride and glory of the survivors in Israel.",
    nt: "I am the true vine, and my Father is the gardener.",
    why: "Isaiah foresaw a glorious Branch springing from the LORD. Jesus declared Himself the true vine — the living source of fruitfulness. Every branch that remains in Him bears the fruit Isaiah described."
  },
  141: {
    ot: "And though a tenth remains in the land, it will again be laid waste. But as the terebinth and oak leave stumps when they are cut down, so the holy seed will be the stump in the land.",
    nt: "So too, at the present time there is a remnant chosen by grace.",
    why: "Isaiah saw that even after devastating judgment, a holy seed — a stump — would remain. Paul identifies this as the remnant chosen by grace, preserved through Christ. God's people are never fully cut off."
  },
  142: {
    ot: "He will be a holy place; for both Israel and Judah he will be a stone that causes people to stumble and a rock that makes them fall.",
    nt: "and, \\\"A stone that causes people to stumble and a rock that makes them fall.\\\" They stumble because they disobey the message — which is also what they were destined for.",
    why: "Isaiah warned that God Himself would become a stumbling stone. Peter applies this directly to Christ — those who refuse to believe find Him an obstacle, while those who trust find Him the cornerstone."
  },
  143: {
    ot: "In that day their burden will be lifted from your shoulders, their yoke from your neck; the yoke will be broken because you have grown so fat.",
    nt: "Coming out of his mouth is a sharp sword with which to strike down the nations. He will rule them with an iron scepter.",
    why: "Isaiah foresaw the day when every oppressive yoke would be shattered. Revelation shows Christ as the one who breaks every yoke — striking down the nations that oppress and ruling with unbreakable authority."
  },
  144: {
    ot: "Do not rejoice, all you Philistines, that the rod that struck you is broken; from the root of that snake will spring up a viper, its fruit will be a darting, venomous serpent.",
    nt: "I, Jesus, have sent my angel to give you this testimony for the churches. I am the Root and the Offspring of David, and the bright Morning Star.",
    why: "Isaiah used root imagery to warn of a coming power. Jesus declared Himself both the Root and Offspring of David — He precedes and descends from the royal line, the Morning Star who outshines every enemy."
  },
  145: {
    ot: "Watchman, what is left of the night? Watchman, what is left of the night? The watchman replies, \\\"Morning is coming, but also the night.\\\"",
    nt: "When Jesus spoke again to the people, he said, \\\"I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.\\\"",
    why: "Isaiah's watchman saw morning coming after a long night. Jesus declared Himself the light of the world — the dawn that the watchman anticipated. In Him, the night of sin and death gives way to eternal day."
  },
  146: {
    ot: "At the end of seventy years, the LORD will deal with Tyre. She will return to her lucrative prostitution and will ply her trade with all the kingdoms on the face of the earth.",
    nt: "\\\"Very truly I tell you,\\\" Jesus answered, \\\"before Abraham was born, I am!\\\"",
    why: "Isaiah spoke of God's sovereign timing over the nations across generations. Jesus revealed that He transcends all earthly timelines — existing before Abraham, the eternal I AM who governs all of history."
  },
  147: {
    ot: "The moon will be dismayed, the sun ashamed; for the LORD Almighty will reign on Mount Zion and in Jerusalem, and before its elders — with great glory.",
    nt: "Then I heard every creature in heaven and on earth and under the earth and on the sea, and all that is in them, saying: \\\"To him who sits on the throne and to the Lamb be praise and honor and glory and power, for ever and ever!\\\"",
    why: "Isaiah foresaw the LORD reigning in glory that outshines the sun and moon. Revelation fulfills this with every creature praising the Lamb on the throne — Christ's glory eclipses all creation."
  },
  148: {
    ot: "In that day the LORD Almighty will be a glorious crown, a beautiful wreath for the remnant of his people.",
    nt: "And when the Chief Shepherd appears, you will receive the crown of glory that will never fade away.",
    why: "Isaiah promised that God Himself would be a crown of glory to His remnant. Peter connects this to Christ — the Chief Shepherd who bestows an unfading crown of glory on His faithful ones."
  },
  149: {
    ot: "Yet the LORD longs to be gracious to you; therefore he will rise up to show you compassion. For the LORD is a God of justice. Blessed are all who wait for him!",
    nt: "The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you, not wanting anyone to perish, but everyone to come to repentance.",
    why: "Isaiah declared that God longs to be gracious and waits to show compassion. Peter echoes this — God's apparent delay is not slowness but patience, giving everyone time to repent and receive His grace through Christ."
  },
  150: {
    ot: "Till the Spirit is poured on us from on high, and the desert becomes a fertile field, and the fertile field seems like a forest.",
    nt: "In the last days, God says, I will pour out my Spirit on all people. Your sons and daughters will prophesy, your young men will see visions, your old men will dream dreams.",
    why: "Isaiah foresaw God's Spirit transforming desolation into abundance. At Pentecost, Peter declared this outpouring fulfilled — the Spirit poured on all people, turning spiritual deserts into flourishing life through Christ."
  },
  151: {
    ot: "Comfort, comfort my people, says your God. Speak tenderly to Jerusalem, and proclaim to her that her hard service has been completed.",
    nt: "Now there was a man in Jerusalem called Simeon, who was righteous and devout. He was waiting for the consolation of Israel, and the Holy Spirit was on him.",
    why: "Isaiah announced that comfort was coming to God's people. Simeon waited his whole life for this consolation — and held it in his arms when he held the infant Jesus. The comfort Isaiah promised has a name."
  },
  152: {
    ot: "I have stirred up one from the north, and he has come — from the rising sun he calls on my name. He treads on rulers as if they were mortar, as if he were a potter treading the clay.",
    nt: "Then one of the elders said to me, \\\"Do not weep! See, the Lion of the tribe of Judah, the Root of David, has triumphed. He is able to open the scroll and its seven seals.\\\"",
    why: "Isaiah spoke of one whom God stirs up — a conqueror who calls on His name. Revelation identifies this conqueror as the Lion of Judah, the Root of David, who alone is worthy to open God's sealed purposes."
  },
  153: {
    ot: "This is what the LORD says: \\\"In the time of my favor I will answer you, and in the day of salvation I will help you.\\\"",
    nt: "For he says, \\\"In the time of my favor I heard you, and in the day of salvation I helped you.\\\" I tell you, now is the time of God's favor, now is the day of salvation.",
    why: "Isaiah prophesied a future day of salvation. Paul declares that day is now — through Christ, the acceptable time has arrived. God's favor is not a distant hope but a present reality for all who believe."
  },
  154: {
    ot: "to say to the captives, \\\"Come out,\\\" and to those in darkness, \\\"Be free!\\\"",
    nt: "He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free.",
    why: "Isaiah foresaw a deliverer who would call captives out of darkness into freedom. Jesus read these words in the Nazareth synagogue and declared them fulfilled in Himself — He is the liberator Isaiah promised."
  },
  155: {
    ot: "I, even I, am he who comforts you. Who are you that you fear mere mortals, human beings who are but grass?",
    nt: "And I will ask the Father, and he will give you another advocate to help you and be with you forever — the Spirit of truth.",
    why: "God declared Himself the ultimate comforter of His people. Jesus promised another Comforter — the Holy Spirit — who would be with believers forever. The comfort God offered through Isaiah becomes permanent through the Spirit."
  },
  156: {
    ot: "For this is what the LORD says: \\\"You were sold for nothing, and without money you will be redeemed.\\\"",
    nt: "For you know that it was not with perishable things such as silver or gold that you were redeemed from the empty way of life handed down to you from your ancestors, but with the precious blood of Christ.",
    why: "Isaiah declared that God's people would be redeemed without money. Peter reveals the currency of that redemption — not silver or gold but the precious blood of Christ. Our freedom was purchased at infinite cost."
  },
  157: {
    ot: "Enlarge the place of your tent, stretch your tent curtains wide, do not hold back; lengthen your cords, strengthen your stakes.",
    nt: "I have other sheep that are not of this sheep pen. I must bring them also. They too will listen to my voice, and there shall be one flock and one shepherd.",
    why: "Isaiah called Israel to expand her tent for the multitudes coming in. Jesus declared He has other sheep beyond Israel's fold — all would become one flock under one shepherd. The tent stretches to cover the world."
  },
  158: {
    ot: "For your Maker is your husband — the LORD Almighty is his name — the Holy One of Israel is your Redeemer; he is called the God of all the earth.",
    nt: "One of the seven angels who had the seven bowls full of the seven last plagues came and said to me, \\\"Come, I will show you the bride, the wife of the Lamb.\\\"",
    why: "Isaiah identified God as the husband of His people. Revelation reveals the Lamb's bride — the church, united with Christ forever. The marriage metaphor that began in Isaiah finds its ultimate wedding feast in glory."
  },
  159: {
    ot: "Afflicted city, lashed by storms and not comforted, I will rebuild you with stones of turquoise, your foundations with lapis lazuli.",
    nt: "The foundations of the city walls were decorated with every kind of precious stone.",
    why: "Isaiah promised that God would rebuild His afflicted city with precious stones. Revelation describes the new Jerusalem with foundations of every precious stone — the afflicted city has become the eternal city of God."
  },
  160: {
    ot: "You will go out in joy and be led forth in peace; the mountains and hills will burst into song before you, and all the trees of the field will clap their hands.",
    nt: "that the creation itself will be liberated from its bondage to decay and brought into the freedom and glory of the children of God.",
    why: "Isaiah envisioned all creation celebrating redemption — mountains singing, trees clapping. Paul declares that creation itself awaits liberation through Christ. Nature groans now but will one day rejoice in full freedom."
  },
  161: {
    ot: "Arise, shine, for your light has come, and the glory of the LORD rises upon you.",
    nt: "When Jesus spoke again to the people, he said, \\\"I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.\\\"",
    why: "Isaiah called God's people to rise because their light had come. Jesus declared Himself that light — the glory of the LORD in human form. Those who follow Him walk in the light Isaiah anticipated."
  },
  162: {
    ot: "Pass through, pass through the gates! Prepare the way for the people. Build up, build up the highway! Remove the stones. Raise a banner for the nations.",
    nt: "Jesus answered, \\\"I am the way and the truth and the life. No one comes to the Father except through me.\\\"",
    why: "Isaiah called for a highway to be prepared for God's people. Jesus revealed that He is the way — not just a road to travel but the living path to the Father. Every stone has been removed."
  },
  163: {
    ot: "He put on righteousness as his breastplate, and the helmet of salvation on his head; he put on the garments of vengeance and wrapped himself in zeal as in a cloak.",
    nt: "He is dressed in a robe dipped in blood, and his name is the Word of God.",
    why: "Isaiah described God clothing Himself in righteousness and vengeance. Revelation shows Christ robed in blood-dipped garments — the Word of God who fights for justice and defeats every enemy."
  },
  164: {
    ot: "Since ancient times no one has heard, no ear has perceived, no eye has seen any God besides you, who acts on behalf of those who wait for him.",
    nt: "However, as it is written: \\\"What no eye has seen, what no ear has heard, and what no human mind has conceived\\\" — the things God has prepared for those who love him.",
    why: "Isaiah marveled that no eye has seen what God prepares for His people. Paul quotes this to describe the surpassing glory that awaits believers in Christ — beyond imagination, beyond comprehension."
  },
  165: {
    ot: "See, I will create new heavens and a new earth. The former things will not be remembered, nor will they come to mind.",
    nt: "Then I saw \\\"a new heaven and a new earth,\\\" for the first heaven and the first earth had passed away, and there was no longer any sea.",
    why: "Isaiah prophesied new heavens and a new earth where former sorrows vanish. Revelation shows John seeing this vision fulfilled — the old creation passes away, and everything is made new through Christ."
  }
};

const filePath = path.join(__dirname, '..', 'data', 'prophecies.ts');
let file = fs.readFileSync(filePath, 'utf8');

let count = 0;
for (const [id, c] of Object.entries(content)) {
  const search = `makeLesson(${id},`;
  const idx = file.indexOf(search);
  if (idx === -1) { console.error(`MISS: ${id}`); continue; }
  const chunk = file.substring(idx, idx + 600);
  const emptyPattern = '"", "", "", "coming-soon"';
  const emptyIdx = chunk.indexOf(emptyPattern);
  if (emptyIdx === -1) { console.error(`NO PATTERN: ${id}`); continue; }
  const absIdx = idx + emptyIdx;
  const replacement = `"${c.ot}", "${c.nt}", "${c.why}"`;
  file = file.substring(0, absIdx) + replacement + file.substring(absIdx + emptyPattern.length);
  count++;
}

fs.writeFileSync(filePath, file, 'utf8');
console.log(`Batch 2 complete: ${count}/35 lessons filled`);
