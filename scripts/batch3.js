const fs = require('fs');
const path = require('path');

const content = {
  166: {
    ot: "Before she goes into labor, she gives birth; before the pains come upon her, she delivers a son.",
    nt: "She gave birth to a son, a male child, who will rule all the nations with an iron scepter. And her child was snatched up to God and to his throne.",
    why: "Isaiah prophesied a miraculous birth — a son delivered before labor pains. Revelation identifies this child as the one who rules all nations, snatched to God's throne. The Messiah's birth defied natural order."
  },
  167: {
    ot: "At that time they will call Jerusalem The Throne of the LORD, and all nations will gather in Jerusalem to honor the name of the LORD.",
    nt: "The throne of God and of the Lamb will be in the city, and his servants will serve him.",
    why: "Jeremiah foresaw Jerusalem becoming the throne of the LORD where all nations gather. Revelation fulfills this — God and the Lamb share the throne in the eternal city, and His servants worship Him forever."
  },
  168: {
    ot: "If they say, \\\"Why has the LORD our God done all this to us?\\\" you will tell them, \\\"As you have forsaken me and served foreign gods in your own land, so now you will serve foreigners in a land not your own.\\\"",
    nt: "However, when the Son of Man comes, will he find faith on the earth?",
    why: "Jeremiah warned of a people who forsook God and faced consequences. Jesus asked a haunting question — will He find faith when He returns? Both passages confront the same reality: human unfaithfulness and God's searching gaze."
  },
  169: {
    ot: "Their leader will be one of their own; their ruler will arise from among them. I will bring him near and he will come close to me — for who is he who will devote himself to be close to me?",
    nt: "Therefore he is able to save completely those who come to God through him, because he always lives to intercede for them.",
    why: "Jeremiah foresaw a ruler arising from His own people who draws near to God. Hebrews reveals Christ as this mediator — one of us yet close to God, always living to intercede for those who come through Him."
  },
  170: {
    ot: "I will put my law in their minds and write it on their hearts. I will be their God, and they will be my people.",
    nt: "This is the covenant I will establish with the people of Israel after that time, declares the Lord. I will put my laws in their minds and write them on their hearts.",
    why: "Jeremiah prophesied a new covenant with God's law written on hearts, not stone. Hebrews declares this fulfilled in Christ — the new covenant transforms believers from the inside out."
  },
  171: {
    ot: "He will give a shout, like those who tread the grapes, against all who live on the earth. He will count them as his flock.",
    nt: "He calls his own sheep by name and leads them out.",
    why: "Jeremiah spoke of God gathering His flock with authority. Jesus identifies Himself as the good shepherd who calls His own sheep by name. The cosmic shepherd knows each one personally."
  },
  172: {
    ot: "You summoned as if for the day of an appointed festival terrors on every side. On the day of the LORD's anger no one escaped or survived.",
    nt: "He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free, to proclaim the year of the Lord's favor.",
    why: "Lamentations mourned the day of God's wrath. Jesus proclaimed the year of the Lord's favor — liberation, not judgment. Where Lamentations saw terror, Christ brought freedom and mercy."
  },
  173: {
    ot: "The punishment of your iniquity is accomplished, O daughter of Zion; he will keep you in exile no longer.",
    nt: "When he had received the drink, Jesus said, \\\"It is finished.\\\" With that, he bowed his head and gave up his spirit.",
    why: "Lamentations declared that Zion's punishment was complete. Jesus cried \\\"It is finished\\\" from the cross — the ultimate completion. All punishment for sin was absorbed by Christ, and exile from God ends forever."
  },
  174: {
    ot: "I will give them an undivided heart and put a new spirit in them; I will remove from them their heart of stone and give them a heart of flesh.",
    nt: "I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh.",
    why: "Ezekiel prophesied God's heart transplant — replacing stone hearts with hearts of flesh. This promise is fulfilled through the new birth in Christ — the Spirit transforms believers from the inside out."
  },
  175: {
    ot: "When I bring back their captives — the captives of Sodom and her daughters, and the captives of Samaria and her daughters — then I will also bring back your captives along with them.",
    nt: "Heaven must receive him until the time comes for God to restore everything, as he promised long ago through his holy prophets.",
    why: "Ezekiel foresaw a time of total restoration — even for the most unexpected peoples. Peter declared that Christ remains in heaven until the time of universal restoration that the prophets promised."
  },
  176: {
    ot: "I will carry out great vengeance on them and punish them in my wrath. Then they will know that I am the LORD, when I take vengeance on them.",
    nt: "The armies of heaven were following him, riding on white horses and dressed in fine linen, white and clean.",
    why: "Ezekiel foretold God's vengeance on the nations that opposed His people. Revelation shows Christ leading heaven's armies to execute that judgment — the final reckoning that vindicates God's justice."
  },
  177: {
    ot: "In that day I will make a horn grow for the Israelites, and I will open your mouth among them. Then they will know that I am the LORD.",
    nt: "He has raised up a horn of salvation for us in the house of his servant David.",
    why: "Ezekiel prophesied a horn — a symbol of power — growing for Israel. Zechariah declared that God raised up a horn of salvation in David's house. That horn is Jesus, the strength of God made flesh."
  },
  178: {
    ot: "I will turn you around and drag you along. I will bring you from the far north and send you against the mountains of Israel.",
    nt: "When the thousand years are over, Satan will be released from his prison and will go out to deceive the nations in the four corners of the earth — Gog and Magog.",
    why: "Ezekiel prophesied a final gathering of hostile nations against God's people. Revelation identifies this as the last battle — Gog and Magog deceived by Satan, ultimately destroyed by God's fire."
  },
  179: {
    ot: "Swarms of living creatures will live wherever the river flows. There will be large numbers of fish, because this water flows there and makes the salt water fresh; so where the river flows everything will live.",
    nt: "On each side of the river stood the tree of life, bearing twelve crops of fruit, yielding its fruit every month. And the leaves of the tree are for the healing of the nations.",
    why: "Ezekiel saw a river flowing from the temple, bringing life wherever it flowed. Revelation shows this river in the new Jerusalem — the river of life with the tree of life healing the nations. What Ezekiel glimpsed, Christ fulfills."
  },
  180: {
    ot: "As I looked, thrones were set in place, and the Ancient of Days took his seat. His clothing was as white as snow; the hair of his head was white like wool.",
    nt: "To the one who is victorious, I will give the right to sit with me on my throne, just as I was victorious and sat down with my Father on his throne.",
    why: "Daniel saw thrones set in place before the Ancient of Days. Jesus promises to share His throne with those who overcome — the heavenly enthronement Daniel witnessed includes a seat for every faithful believer."
  },
  181: {
    ot: "Then I heard a holy one speaking, and another holy one said to him, \\\"How long will it take for the vision to be fulfilled?\\\"",
    nt: "I consider that our present sufferings are not worth comparing with the glory that will be revealed in us.",
    why: "Daniel heard heavenly beings asking how long until God's purposes are fulfilled. Paul answers with confident hope — present sufferings are nothing compared to the coming glory. The wait ends in Christ."
  },
  182: {
    ot: "Seventy 'sevens' are decreed for your people and your holy city to finish transgression, to put an end to sin, to atone for wickedness, to bring in everlasting righteousness.",
    nt: "They will fall by the sword and will be taken as prisoners to all the nations. Jerusalem will be trampled on by the Gentiles until the times of the Gentiles are fulfilled.",
    why: "Daniel received God's precise timeline for finishing transgression and bringing everlasting righteousness. Jesus pointed to Jerusalem's fate as part of this prophetic clock — the times of the Gentiles marking the countdown to His return."
  },
  183: {
    ot: "At that time Michael, the great prince who protects your people, will arise. There will be a time of distress such as has not happened from the beginning of nations until then.",
    nt: "For then there will be great distress, unequaled from the beginning of the world until now — and never to be equaled again.",
    why: "Daniel prophesied unprecedented tribulation. Jesus confirmed it — great distress unequaled in history. Both passages point to the same climactic period before God's kingdom is fully established."
  },
  184: {
    ot: "Say of your brothers, \\\"My people,\\\" and of your sisters, \\\"My loved one.\\\"",
    nt: "He prophesied that Jesus would die for the Jewish nation, and not only for that nation but also for the scattered children of God, to bring them together and make them one.",
    why: "Hosea foresaw the day when the scattered would be called God's people again. John reveals that Jesus died to gather all of God's scattered children — Jew and Gentile — into one family."
  },
  185: {
    ot: "Afterward the Israelites will return and seek the LORD their God and David their king. They will come trembling to the LORD and to his blessings in the last days.",
    nt: "He will be great and will be called the Son of the Most High. The Lord God will give him the throne of his father David.",
    why: "Hosea prophesied that Israel would seek David their king in the last days. Gabriel announced that Jesus would receive David's throne. The king Hosea foresaw is Christ — the ultimate David."
  },
  186: {
    ot: "After two days he will revive us; on the third day he will restore us, that we may live in his presence.",
    nt: "He told them, \\\"This is what is written: The Messiah will suffer and rise from the dead on the third day.\\\"",
    why: "Hosea spoke of revival on the third day. Jesus declared that the Messiah would rise on the third day — Hosea's prophecy found its literal fulfillment in the resurrection of Christ."
  },
  187: {
    ot: "I will deliver this people from the power of the grave; I will redeem them from death. Where, O death, are your plagues? Where, O grave, is your destruction?",
    nt: "Where, O death, is your victory? Where, O death, is your sting?",
    why: "Hosea challenged death and the grave with God's redemptive power. Paul echoes these exact words in celebration of Christ's resurrection — death has lost its sting, the grave its victory, through Jesus."
  },
  188: {
    ot: "They will blossom like the vine; Israel's fame will be like the wine of Lebanon. His young shoots will grow.",
    nt: "Very truly I tell you, unless a kernel of wheat falls to the ground and dies, it remains only a single seed. But if it dies, it produces many seeds.",
    why: "Hosea foresaw Israel flourishing like a vine with spreading shoots. Jesus used similar imagery — a grain must die to bear fruit. His death was the seed that produced the worldwide harvest Hosea envisioned."
  },
  189: {
    ot: "I will gather all nations and bring them down to the Valley of Jehoshaphat. There I will put them on trial for what they did to my inheritance, my people Israel.",
    nt: "All the nations will be gathered before him, and he will separate the people one from another as a shepherd separates the sheep from the goats.",
    why: "Joel prophesied God gathering all nations for judgment. Jesus described this same scene — all nations gathered before Him for separation. The Judge of Joel's vision is Christ on His throne."
  },
  190: {
    ot: "He who forms the mountains, who creates the wind, and who reveals his thoughts to mankind, who turns dawn to darkness, and treads on the heights of the earth — the LORD God Almighty is his name.",
    nt: "When he opened the seventh seal, there was silence in heaven for about half an hour.",
    why: "Amos described God's overwhelming majesty — forming mountains, creating wind, treading on earth's heights. Revelation shows all heaven falling silent before this God — even the hosts of heaven are awed into stillness."
  },
  191: {
    ot: "Woe to you who long for the day of the LORD! Why do you long for the day of the LORD? That day will be darkness, not light.",
    nt: "Just as it was in the days of Noah, so also will it be in the days of the Son of Man.",
    why: "Amos warned that the day of the LORD brings judgment, not comfort, to the unprepared. Jesus echoed this — His return will catch people unaware, just as the flood did. The day of the Lord demands readiness."
  },
  192: {
    ot: "He will judge between many peoples and will settle disputes for strong nations far and wide. They will beat their swords into plowshares and their spears into pruning hooks. Nation will not take up sword against nation, nor will they train for war anymore.",
    nt: "He will judge between the nations and will settle disputes for many peoples. They will beat their swords into plowshares and their spears into pruning hooks.",
    why: "Micah and Isaiah both prophesied the same glorious future — God judging between nations, weapons becoming farming tools, war abolished forever. Christ is the Prince of Peace who will bring this vision to reality."
  },
  193: {
    ot: "All the nations may walk in the name of their gods, but we will walk in the name of the LORD our God for ever and ever.",
    nt: "that at the name of Jesus every knee should bow, in heaven and on earth and under the earth.",
    why: "Micah declared loyalty to God's name above all others. Paul reveals that every knee will bow at the name of Jesus — every rival name will yield to the one name above all names."
  },
  194: {
    ot: "Then the LORD showed me four craftsmen. I asked, \\\"What are these coming to do?\\\" He answered, \\\"These are the horns that scattered Judah... but the craftsmen have come to terrify them.\\\"",
    nt: "Then I heard the number of those who were sealed: 144,000 from all the tribes of Israel.",
    why: "Zechariah saw four craftsmen raised up to counter the powers that scattered God's people. Revelation shows 144,000 sealed from all tribes — God's complete answer to the scattering, gathering and protecting His own."
  },
  195: {
    ot: "Shout and be glad, Daughter Zion. For I am coming, and I will live among you, declares the LORD.",
    nt: "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.",
    why: "Zechariah proclaimed that God Himself would come and dwell among His people. John declares this fulfilled — the Word became flesh and tabernacled among us. God's promise to live with us became real in Jesus."
  },
  196: {
    ot: "What are you, mighty mountain? Before Zerubbabel you will become level ground.",
    nt: "Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, \\\"Move from here to there,\\\" and it will move. Nothing will be impossible for you.",
    why: "Zechariah declared that mountains would flatten before God's chosen servant. Jesus taught that faith moves mountains — the same divine power that levels obstacles works through those who trust Him."
  },
  197: {
    ot: "The seed will grow well, the vine will yield its fruit, the ground will produce its crops, and the heavens will drop their dew.",
    nt: "I have come that they may have life, and have it to the full.",
    why: "Zechariah promised abundant provision — fruitful vines, productive ground, heaven's dew. Jesus declared that He came to give life abundantly. The overflowing provision Zechariah described is what Christ delivers to all who follow Him."
  },
  198: {
    ot: "In those days ten people from all languages and nations will take firm hold of one Jew by the hem of his robe and say, \\\"Let us go with you, because we have heard that God is with you.\\\"",
    nt: "Now there were some Greeks among those who went up to worship at the festival. They came to Philip with a request. \\\"Sir,\\\" they said, \\\"we would like to see Jesus.\\\"",
    why: "Zechariah foresaw Gentiles from every nation seeking God through a Jew. John records Greeks coming to see Jesus — the fulfillment begins. The nations grasp the hem of Christ's robe."
  },
  199: {
    ot: "From Judah will come the cornerstone, from him the tent peg, from him the battle bow, from him every ruler.",
    nt: "built on the foundation of the apostles and prophets, with Christ Jesus himself as the chief cornerstone.",
    why: "Zechariah prophesied a cornerstone coming from Judah — the foundation of everything. Paul identifies Christ as the chief cornerstone on which the whole building of God's people rises."
  },
  200: {
    ot: "The land will mourn, each clan by itself, with their wives by themselves: the clan of the house of David and their wives.",
    nt: "Look, he is coming with the clouds, and every eye will see him, even those who pierced him; and all peoples on earth will mourn because of him.",
    why: "Zechariah foresaw mourning over the one who was pierced. Revelation declares that every eye will see Christ — including those who pierced Him — and all peoples will mourn. The crucified one returns as the reigning King."
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
console.log(`Batch 3 complete: ${count}/35 lessons filled`);
