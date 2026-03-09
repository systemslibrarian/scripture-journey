import type { Lesson, LessonCategory, QuizData } from '@/lib/types';

const QUIZ_POOL = [
  'Genesis 3:15',
  'Genesis 12:3',
  'Genesis 49:10',
  'Exodus 12:46',
  'Deuteronomy 18:15',
  '2 Samuel 7:12–13',
  'Psalm 2:7',
  'Psalm 16:10',
  'Psalm 22:16',
  'Psalm 22:18',
  'Psalm 41:9',
  'Psalm 69:21',
  'Isaiah 7:14',
  'Isaiah 9:6–7',
  'Isaiah 35:5–6',
  'Isaiah 42:1–6',
  'Isaiah 53:5',
  'Jeremiah 23:5',
  'Micah 5:2',
  'Zechariah 9:9',
  'Zechariah 11:12–13',
  'Zechariah 12:10',
  'Malachi 3:1',
];

function buildQuiz(id: number, otReference: string): QuizData {
  const distractors = QUIZ_POOL.filter((ref) => ref !== otReference);
  const start = (id * 3) % distractors.length;
  const picks = [
    distractors[start],
    distractors[(start + 5) % distractors.length],
    distractors[(start + 11) % distractors.length],
  ];
  const choices = [otReference, ...picks];

  const rotation = id % 4;
  const rotated = choices.slice(rotation).concat(choices.slice(0, rotation));
  const answer = rotated.indexOf(otReference);

  return {
    question: 'Which Old Testament reference is connected to this lesson?',
    choices: rotated,
    answer,
  };
}

function makeLesson(
  id: number,
  slug: string,
  title: string,
  category: LessonCategory,
  otReference: string,
  ntReference: string,
  summary: string,
  whyItMatters: string,
): Lesson {
  return {
    id,
    slug,
    title,
    category,
    otReference,
    otText: `Read ${otReference}.`,
    ntReference,
    ntText: `See how this connects in ${ntReference}.`,
    summary,
    whyItMatters,
    reflection:
      'Lord Jesus, help me see how all Scripture points to You and deepen my faith as I learn Your Word.',
    quiz: buildQuiz(id, otReference),
  };
}

export const prophecies: Lesson[] = [
  makeLesson(1, 'the-seed-of-the-woman', 'The Seed of the Woman', 'Identity', 'Genesis 3:15', 'Hebrews 2:14; 1 John 3:8', 'The first promise of a coming Deliverer appears right after the fall.', 'Christians understand this as pointing to Jesus defeating Satan, sin, and death.'),
  makeLesson(2, 'the-blessing-through-abraham', 'The Blessing Through Abraham', 'Identity', 'Genesis 12:3; 22:18', 'Galatians 3:16', 'God promised that blessing would reach the nations through Abraham’s offspring.', 'Jesus brings salvation beyond one people group to the whole world.'),
  makeLesson(3, 'the-line-of-isaac', 'The Line of Isaac', 'Identity', 'Genesis 17:19; 21:12', 'Luke 3:34', 'The covenant line is narrowed through Isaac.', 'The Messiah comes through God’s chosen covenant line, not human preference.'),
  makeLesson(4, 'the-line-of-jacob', 'The Line of Jacob', 'Identity', 'Numbers 24:17', 'Matthew 1:2; Luke 3:34', 'A star and ruler will arise from Israel.', 'Christians see this as part of the growing expectation of a coming King.'),
  makeLesson(5, 'the-tribe-of-judah', 'The Tribe of Judah', 'Identity', 'Genesis 49:10', 'Hebrews 7:14', 'The royal scepter is tied to Judah.', 'Jesus comes from the tribe long associated with kingship and rule.'),
  makeLesson(6, 'heir-to-davids-throne', 'Heir to David’s Throne', 'Identity', '2 Samuel 7:12–13; Isaiah 9:7', 'Luke 1:32–33', 'God promised David an everlasting throne through his line.', 'Jesus is presented as the promised Son of David whose kingdom never ends.'),
  makeLesson(7, 'the-root-of-jesse', 'The Root of Jesse', 'Identity', 'Isaiah 11:1', 'Matthew 1:6; Luke 3:32', 'A shoot would come from Jesse’s line.', 'This keeps the messianic hope tied to David’s family.'),
  makeLesson(8, 'called-gods-son', 'Called God’s Son', 'Identity', 'Psalm 2:7', 'Matthew 3:17; Hebrews 1:5', 'The anointed King is uniquely identified as God’s Son.', 'Jesus is presented as more than a merely earthly ruler.'),
  makeLesson(9, 'born-of-a-virgin', 'Born of a Virgin', 'Identity', 'Isaiah 7:14', 'Matthew 1:22–23; Luke 1:26–35', 'A miraculous birth marks the coming child.', 'Christians understand this as fulfilled in the virgin birth of Jesus.'),
  makeLesson(10, 'called-immanuel', 'Called Immanuel', 'Identity', 'Isaiah 7:14', 'Matthew 1:23', 'The promised child is associated with “God with us.”', 'Jesus reveals God’s presence with His people in a unique way.'),

  makeLesson(11, 'born-in-bethlehem', 'Born in Bethlehem', 'Identity', 'Micah 5:2', 'Matthew 2:1; Luke 2:4–7', 'Bethlehem is named as the birthplace of the coming ruler.', 'Jesus is born where the prophet said the ruler would come from.'),
  makeLesson(12, 'from-eternity', 'From Eternity', 'Identity', 'Micah 5:2', 'John 1:1–2; John 8:58', 'The ruler’s origins are described in strikingly ancient language.', 'Christians understand this as fitting Jesus’ divine preexistence.'),
  makeLesson(13, 'out-of-egypt', 'Out of Egypt', 'Identity', 'Hosea 11:1', 'Matthew 2:14–15', 'Israel’s story is echoed in the Messiah’s early life.', 'Jesus retraces and fulfills the story of God’s people.'),
  makeLesson(14, 'mourning-in-ramah', 'Mourning in Ramah', 'Identity', 'Jeremiah 31:15', 'Matthew 2:16–18', 'A scene of weeping is connected to the arrival of the child.', 'Matthew connects this sorrowful moment with events around Jesus’ birth.'),
  makeLesson(15, 'called-a-nazarene', 'Called a Nazarene', 'Identity', 'Matthew 2:23', 'Matthew 2:23', 'Jesus grows up in a place associated with lowliness and rejection.', 'This fits the wider prophetic pattern of the humble and despised Messiah.'),

  makeLesson(16, 'messenger-prepares-the-way', 'Messenger Prepares the Way', 'Ministry', 'Malachi 3:1', 'Mark 1:2; Matthew 11:10', 'A messenger is sent ahead of the Lord’s coming.', 'John the Baptist prepares the people for Jesus.'),
  makeLesson(17, 'voice-in-the-wilderness', 'Voice in the Wilderness', 'Ministry', 'Isaiah 40:3', 'Matthew 3:1–3; John 1:23', 'A voice in the wilderness calls people to prepare the way.', 'John’s ministry fulfills that role before Jesus’ public work begins.'),
  makeLesson(18, 'elijah-like-forerunner', 'Elijah-Like Forerunner', 'Ministry', 'Malachi 4:5–6', 'Luke 1:17; Matthew 11:13–14', 'A forerunner in Elijah’s spirit would come first.', 'John the Baptist is described in exactly that kind of role.'),
  makeLesson(19, 'anointed-by-the-spirit', 'Anointed by the Spirit', 'Ministry', 'Isaiah 11:2; Isaiah 61:1', 'Matthew 3:16; Luke 4:18', 'The Spirit would rest on the Messiah.', 'Jesus’ ministry is marked by the Spirit’s presence and power.'),
  makeLesson(20, 'beloved-servant-son', 'Beloved Servant Son', 'Ministry', 'Psalm 2:7; Isaiah 42:1', 'Matthew 3:17', 'The Father’s delight rests on the chosen one.', 'At Jesus’ baptism, the Father publicly identifies Him.'),
  makeLesson(21, 'light-in-galilee', 'Light in Galilee', 'Ministry', 'Isaiah 9:1–2', 'Matthew 4:12–16', 'A region marked by darkness would see a great light.', 'Jesus begins His public ministry in Galilee.'),
  makeLesson(22, 'light-to-the-gentiles', 'Light to the Gentiles', 'Ministry', 'Isaiah 42:1–6; Isaiah 49:6', 'Luke 2:32; Matthew 12:18–21', 'The Messiah’s mission extends beyond Israel.', 'Jesus is presented as a light for the nations.'),
  makeLesson(23, 'good-news-to-the-poor', 'Good News to the Poor', 'Ministry', 'Isaiah 61:1', 'Luke 4:18', 'The anointed one proclaims good news to the poor.', 'Jesus openly reads and applies this passage to His mission.'),
  makeLesson(24, 'bind-up-the-brokenhearted', 'Bind Up the Brokenhearted', 'Ministry', 'Isaiah 61:1', 'Matthew 11:28–30', 'The coming servant brings healing and comfort.', 'Jesus ministers with mercy to the weary and wounded.'),
  makeLesson(25, 'proclaim-liberty', 'Proclaim Liberty', 'Ministry', 'Isaiah 61:1', 'Luke 4:18', 'The servant announces freedom and release.', 'Jesus brings spiritual liberty through the gospel.'),

  makeLesson(26, 'prophet-like-moses', 'Prophet Like Moses', 'Ministry', 'Deuteronomy 18:15', 'Acts 3:22–23; John 6:14', 'A prophet like Moses would arise and must be heard.', 'Christians understand Jesus as the greater Moses who brings God’s final word.'),
  makeLesson(27, 'wisdom-and-understanding', 'Wisdom and Understanding', 'Ministry', 'Isaiah 11:2', 'Luke 2:47; Colossians 2:3', 'The Messiah is marked by wisdom and insight.', 'Jesus teaches with a depth and authority that astonish people.'),
  makeLesson(28, 'zeal-for-gods-house', 'Zeal for God’s House', 'Ministry', 'Psalm 69:9', 'John 2:17', 'Holy zeal is tied to the righteous sufferer.', 'Jesus’ cleansing of the temple reflects that same passion.'),
  makeLesson(29, 'teaches-in-parables', 'Teaches in Parables', 'Ministry', 'Psalm 78:2', 'Matthew 13:34–35', 'Truth is spoken through parables and hidden sayings.', 'Jesus often teaches in parables, fulfilling that pattern.'),
  makeLesson(30, 'gentle-servant', 'Gentle Servant', 'Ministry', 'Isaiah 42:2–3', 'Matthew 12:17–20', 'The servant is gentle and does not crush the weak.', 'Jesus’ kingdom comes with strength under control and mercy.'),
  makeLesson(31, 'does-not-quarrel', 'Does Not Quarrel', 'Ministry', 'Isaiah 42:2', 'Matthew 12:18–19', 'The servant does not advance His mission through noisy self-promotion.', 'Jesus often withdraws from spectacle and remains focused on obedience.'),
  makeLesson(32, 'the-righteous-branch', 'The Righteous Branch', 'Identity', 'Jeremiah 23:5', 'Acts 3:14; John 8:46', 'A righteous king from David’s line is promised.', 'Jesus is presented as the righteous one without sin.'),
  makeLesson(33, 'sinless-servant', 'Sinless Servant', 'Identity', 'Isaiah 53:9', '1 Peter 2:22; 2 Corinthians 5:21', 'The servant suffers though no deceit is found in Him.', 'A sinless Savior is essential for true substitution.'),
  makeLesson(34, 'delights-in-the-lord', 'Delights in the Lord', 'Ministry', 'Isaiah 11:3', 'John 8:29', 'The coming one delights in the fear of the Lord.', 'Jesus consistently does what pleases the Father.'),
  makeLesson(35, 'speaks-with-authority', 'Speaks with Authority', 'Ministry', 'Isaiah 50:4', 'Matthew 7:28–29; John 7:46', 'The servant is given words that sustain and teach.', 'Jesus speaks with unmatched authority and grace.'),

  makeLesson(36, 'blind-eyes-opened', 'Blind Eyes Opened', 'Ministry', 'Isaiah 35:5', 'Matthew 11:4–5; John 9', 'The messianic age includes sight for the blind.', 'Jesus’ healing miracles testify to who He is.'),
  makeLesson(37, 'deaf-ears-opened', 'Deaf Ears Opened', 'Ministry', 'Isaiah 35:5', 'Mark 7:31–37', 'The deaf hear when God’s saving work arrives.', 'Jesus’ miracles reveal the nearness of God’s kingdom.'),
  makeLesson(38, 'lame-walk', 'Lame Walk', 'Ministry', 'Isaiah 35:6', 'Matthew 15:30–31', 'The lame leap in the day of salvation.', 'Jesus restores what sin and brokenness have ruined.'),
  makeLesson(39, 'mute-speak', 'Mute Speak', 'Ministry', 'Isaiah 35:6', 'Matthew 9:32–33', 'The tongue of the mute sings for joy.', 'Jesus’ healing ministry displays messianic signs.'),
  makeLesson(40, 'good-news-proclaimed', 'Good News Proclaimed', 'Ministry', 'Isaiah 61:1', 'Matthew 11:5', 'The poor hear good news in the promised age.', 'Jesus points to this as evidence that He is the expected one.'),
  makeLesson(41, 'bears-our-sicknesses', 'Bears Our Sicknesses', 'Ministry', 'Isaiah 53:4', 'Matthew 8:16–17', 'The servant carries griefs and sorrows.', 'Jesus’ healing ministry is linked to His redemptive mission.'),
  makeLesson(42, 'carries-our-griefs', 'Carries Our Griefs', 'Ministry', 'Isaiah 53:4', 'Matthew 8:17', 'The servant shares in human suffering.', 'Christ meets people not only in guilt but also in grief.'),
  makeLesson(43, 'raises-the-dead', 'Raises the Dead', 'Ministry', 'Isaiah 26:19', 'Luke 7:14–15; John 11', 'God’s saving power includes victory over death.', 'Jesus demonstrates authority over death itself.'),
  makeLesson(44, 'brings-justice', 'Brings Justice', 'Ministry', 'Isaiah 42:1', 'Matthew 12:18', 'The servant faithfully brings justice.', 'Jesus establishes a kingdom built on truth and righteousness.'),
  makeLesson(45, 'covenant-for-the-people', 'Covenant for the People', 'Ministry', 'Isaiah 42:6; Isaiah 49:8', 'Luke 22:20; Hebrews 8', 'The servant is given as a covenant for the people.', 'Jesus does not merely announce the covenant; He mediates it.'),

  makeLesson(46, 'rejected-by-his-own', 'Rejected by His Own', 'Rejection', 'Isaiah 53:3', 'John 1:11', 'The servant is despised and not received.', 'Jesus’ rejection was not a failure of prophecy but part of it.'),
  makeLesson(47, 'despised-and-rejected', 'Despised and Rejected', 'Rejection', 'Isaiah 53:3', 'Luke 23:18; Mark 15:13–14', 'The suffering servant is rejected by many.', 'The cross is set in the context of widespread rejection.'),
  makeLesson(48, 'rejected-stone', 'Rejected Stone', 'Rejection', 'Psalm 118:22', 'Matthew 21:42; Acts 4:11', 'The stone rejected by builders becomes the cornerstone.', 'Jesus is rejected by leaders yet becomes central in God’s plan.'),
  makeLesson(49, 'stumbling-stone', 'Stumbling Stone', 'Rejection', 'Isaiah 8:14; Isaiah 28:16', 'Romans 9:32–33; 1 Peter 2:6–8', 'The Lord’s chosen stone becomes a point of decision.', 'People either trust Christ or stumble over Him.'),
  makeLesson(50, 'hated-without-cause', 'Hated Without Cause', 'Rejection', 'Psalm 69:4', 'John 15:24–25', 'The righteous sufferer is hated unfairly.', 'Jesus experiences unjust hatred though He did no wrong.'),
  makeLesson(51, 'misunderstood-by-family', 'Misunderstood by Family', 'Rejection', 'Psalm 69:8', 'Mark 3:21; John 7:5', 'Even those close to the righteous sufferer do not fully understand Him.', 'Jesus also faced misunderstanding among those nearest to Him.'),
  makeLesson(52, 'leaders-conspire', 'Leaders Conspire', 'Rejection', 'Psalm 2:1–2', 'Acts 4:25–28', 'Rulers gather against the Lord and His Anointed.', 'Jewish and Gentile authorities unite against Jesus.'),
  makeLesson(53, 'considered-stricken', 'Considered Stricken', 'Rejection', 'Isaiah 53:4', 'Matthew 27:41–43', 'The servant is wrongly viewed as rejected by God.', 'The crowd misreads the cross, but God is accomplishing salvation through it.'),
  makeLesson(54, 'mocked-by-onlookers', 'Mocked by Onlookers', 'Rejection', 'Psalm 22:7–8', 'Matthew 27:39–43', 'The righteous sufferer is mocked and scorned.', 'The crucifixion scene echoes this psalm with striking detail.'),
  makeLesson(55, 'abhorred-by-the-nation', 'Abhorred by the Nation', 'Rejection', 'Isaiah 49:7', 'John 19:14–15', 'The servant is despised before He is honored.', 'Jesus is publicly rejected even by those who should have welcomed Him.'),

  makeLesson(56, 'king-on-a-donkey', 'King on a Donkey', 'Ministry', 'Zechariah 9:9', 'Matthew 21:4–9; John 12:14–15', 'Zion’s king comes humbly, riding on a donkey.', 'Jesus intentionally presents Himself in this royal yet humble way.'),
  makeLesson(57, 'presented-as-king', 'Presented as King', 'Ministry', 'Zechariah 9:9; Psalm 118:26', 'Matthew 21:9', 'The coming king is welcomed in the Lord’s name.', 'Jesus enters Jerusalem with clear messianic significance.'),
  makeLesson(58, 'blessed-is-he', 'Blessed Is He', 'Ministry', 'Psalm 118:26', 'Matthew 21:9', 'The arriving one is blessed in the Lord’s name.', 'This language surrounds Jesus at His public entry into Jerusalem.'),
  makeLesson(59, 'the-lord-to-his-temple', 'The Lord to His Temple', 'Ministry', 'Malachi 3:1', 'Matthew 21:12–14', 'The Lord suddenly comes to His temple.', 'Jesus’ temple actions fit this expectation.'),
  makeLesson(60, 'betrayed-by-a-close-friend', 'Betrayed by a Close Friend', 'Passion', 'Psalm 41:9', 'John 13:18; Matthew 26:47–50', 'A trusted companion turns against the righteous sufferer.', 'Judas’ betrayal fits this deeply painful pattern.'),
  makeLesson(61, 'betrayed-for-thirty-silver', 'Betrayed for Thirty Pieces of Silver', 'Passion', 'Zechariah 11:12', 'Matthew 26:14–15', 'The shepherd is valued at thirty pieces of silver.', 'Judas receives that exact amount for betraying Jesus.'),
  makeLesson(62, 'silver-thrown-in-the-house-of-the-lord', 'Silver Thrown in the House of the Lord', 'Passion', 'Zechariah 11:13', 'Matthew 27:5', 'The rejected silver is thrown into the house of the Lord.', 'Judas throws the money into the temple.'),
  makeLesson(63, 'potters-field', 'Potter’s Field', 'Passion', 'Zechariah 11:13', 'Matthew 27:6–10', 'The rejected silver becomes tied to a potter’s field.', 'Matthew highlights this unusual detail after Judas’ death.'),
  makeLesson(64, 'shepherd-struck-sheep-scattered', 'Shepherd Struck, Sheep Scattered', 'Passion', 'Zechariah 13:7', 'Matthew 26:31; Matthew 26:56', 'When the shepherd is struck, the sheep scatter.', 'Jesus’ disciples flee in His hour of arrest.'),
  makeLesson(65, 'abandoned-in-suffering', 'Abandoned in Suffering', 'Passion', 'Isaiah 63:3', 'Mark 14:50', 'The suffering one treads the winepress alone.', 'Jesus faces the decisive hour in deep loneliness.'),
  makeLesson(66, 'betrayer-shares-bread', 'Betrayer Shares Bread', 'Passion', 'Psalm 41:9', 'John 13:26', 'The betrayer is one who shared table fellowship.', 'The nearness of Judas makes the betrayal even more tragic.'),

  makeLesson(67, 'silent-before-accusers', 'Silent Before Accusers', 'Passion', 'Isaiah 53:7', 'Matthew 27:12–14; Mark 15:4–5', 'The servant is silent like a lamb before shearers.', 'Jesus does not defend Himself in the usual way before His accusers.'),
  makeLesson(68, 'struck-and-spit-upon', 'Struck and Spit Upon', 'Passion', 'Isaiah 50:6', 'Matthew 26:67; Matthew 27:30', 'The servant gives His back and face to shameful abuse.', 'Jesus willingly endures humiliating violence.'),
  makeLesson(69, 'wounded-for-our-transgressions', 'Wounded for Our Transgressions', 'Passion', 'Isaiah 53:5', 'Matthew 27:26; 1 Peter 2:24', 'The servant is pierced and wounded for others.', 'Christians understand the cross as substitutionary.'),
  makeLesson(70, 'appearance-marred', 'Appearance Marred', 'Passion', 'Isaiah 52:14', 'John 19:1–5', 'The servant’s appearance is shockingly disfigured.', 'The suffering of Jesus is severe, physical, and public.'),
  makeLesson(71, 'numbered-with-transgressors', 'Numbered with Transgressors', 'Passion', 'Isaiah 53:12', 'Luke 22:37; Mark 15:27–28', 'The servant is counted among sinners.', 'Jesus is crucified alongside criminals.'),
  makeLesson(72, 'innocent-yet-condemned', 'Innocent Yet Condemned', 'Passion', 'Isaiah 53:8–9', 'Luke 23:4; Luke 23:14–15; Luke 23:22', 'The righteous servant is cut off unjustly.', 'Even Pilate repeatedly finds no guilt in Jesus.'),
  makeLesson(73, 'false-witnesses-rise', 'False Witnesses Rise', 'Passion', 'Psalm 27:12; Psalm 35:11', 'Matthew 26:59–61', 'False witnesses stand against the righteous sufferer.', 'Jesus is tried amid dishonest testimony.'),
  makeLesson(74, 'given-over-to-gentiles', 'Given Over to Gentiles', 'Passion', 'Psalm 2:1–2', 'Matthew 20:19; John 18:28–32', 'The nations join in opposing the Lord’s Anointed.', 'Jesus is handed over to Roman authority.'),
  makeLesson(75, 'mocked-and-insulted', 'Mocked and Insulted', 'Passion', 'Psalm 22:7; Psalm 69:20', 'Luke 23:35–37', 'The sufferer is surrounded by reproach and ridicule.', 'The mockery at the cross mirrors the language of the Psalms.'),

  makeLesson(76, 'hands-and-feet-pierced', 'Hands and Feet Pierced', 'Passion', 'Psalm 22:16', 'John 20:25–27', 'The sufferer’s hands and feet are pierced.', 'Christians see this as a striking anticipation of crucifixion.'),
  makeLesson(77, 'surrounded-by-evil-doers', 'Surrounded by Evildoers', 'Passion', 'Psalm 22:16', 'Matthew 27:38–44', 'The righteous sufferer is encircled by the wicked.', 'Jesus dies in the midst of hostile mockers and criminals.'),
  makeLesson(78, 'people-stare-at-him', 'People Stare at Him', 'Passion', 'Psalm 22:17', 'Luke 23:35', 'The sufferer becomes a public spectacle.', 'The cross exposes Jesus to the gaze of the crowd.'),
  makeLesson(79, 'garments-divided', 'Garments Divided', 'Passion', 'Psalm 22:18', 'John 19:23–24', 'The sufferer’s garments are divided among onlookers.', 'Roman soldiers do exactly this at the crucifixion.'),
  makeLesson(80, 'lots-cast-for-clothing', 'Lots Cast for Clothing', 'Passion', 'Psalm 22:18', 'John 19:24', 'Lots are cast for the sufferer’s clothing.', 'This highly specific detail is explicitly connected to Jesus.'),
  makeLesson(81, 'given-bitter-drink', 'Given Bitter Drink', 'Passion', 'Psalm 69:21', 'Matthew 27:34', 'The righteous sufferer is given bitter drink.', 'Jesus receives a sour and bitter offering in His suffering.'),
  makeLesson(82, 'given-vinegar', 'Given Vinegar', 'Passion', 'Psalm 69:21', 'John 19:28–30', 'The sufferer is given vinegar in thirst.', 'John connects this to Scripture in Jesus’ final moments.'),
  makeLesson(83, 'heads-shaken', 'Heads Shaken', 'Passion', 'Psalm 22:7', 'Matthew 27:39', 'Onlookers shake their heads at the sufferer.', 'The crucifixion scene closely reflects this psalm.'),
  makeLesson(84, 'let-god-deliver-him', 'Let God Deliver Him', 'Passion', 'Psalm 22:8', 'Matthew 27:43', 'Mockers challenge God to rescue the sufferer.', 'The words spoken at the cross echo the psalm almost directly.'),
  makeLesson(85, 'cry-of-abandonment', 'Cry of Abandonment', 'Passion', 'Psalm 22:1', 'Matthew 27:46; Mark 15:34', 'The righteous sufferer cries out to God in anguish.', 'Jesus deliberately voices this psalm from the cross.'),
  makeLesson(86, 'heart-like-wax', 'Heart Like Wax', 'Passion', 'Psalm 22:14', 'John 19:34', 'The sufferer is poured out in total weakness.', 'Christians often connect this imagery with the depth of Jesus’ suffering.'),
  makeLesson(87, 'strength-dried-up', 'Strength Dried Up', 'Passion', 'Psalm 22:15', 'John 19:28', 'The sufferer’s strength fails and thirst intensifies.', 'Jesus’ cry of thirst fits the suffering language of the psalm.'),
  makeLesson(88, 'not-a-bone-broken', 'Not a Bone Broken', 'Passion', 'Exodus 12:46; Psalm 34:20', 'John 19:33–36', 'The Passover lamb and righteous sufferer are preserved in this detail.', 'Jesus is shown as the true Passover Lamb.'),
  makeLesson(89, 'side-pierced', 'Side Pierced', 'Passion', 'Zechariah 12:10', 'John 19:34; John 19:37', 'They will look on the one whom they pierced.', 'John directly ties Jesus’ pierced side to this text.'),
  makeLesson(90, 'cut-off-from-the-land-of-the-living', 'Cut Off from the Land of the Living', 'Passion', 'Isaiah 53:8', 'Luke 23:46; John 19:30', 'The servant is cut off in death.', 'Jesus truly dies; the cross is not merely symbolic.'),

  makeLesson(91, 'bears-our-sins', 'Bears Our Sins', 'Passion', 'Isaiah 53:4–6; Isaiah 53:12', '1 Peter 2:24; Romans 4:25', 'The servant bears the sin of many.', 'The gospel centers on Jesus carrying the guilt we could not remove.'),
  makeLesson(92, 'pierced-for-our-transgressions', 'Pierced for Our Transgressions', 'Passion', 'Isaiah 53:5', 'Romans 5:6–8; John 19:34–37', 'The servant suffers for others, not for His own sin.', 'Christians understand Jesus’ death as loving substitution.'),
  makeLesson(93, 'by-his-wounds-we-are-healed', 'By His Wounds We Are Healed', 'Passion', 'Isaiah 53:5', '1 Peter 2:24', 'Healing flows from the servant’s wounds.', 'The cross brings spiritual restoration and peace with God.'),
  makeLesson(94, 'lamb-led-to-slaughter', 'Lamb Led to Slaughter', 'Passion', 'Isaiah 53:7', 'Acts 8:32–35; John 1:29', 'The servant goes willingly like a lamb to sacrifice.', 'Jesus is identified as the Lamb of God.'),
  makeLesson(95, 'intercedes-for-transgressors', 'Intercedes for Transgressors', 'Passion', 'Isaiah 53:12', 'Luke 23:34; Hebrews 7:25', 'The servant prays for sinners even in suffering.', 'Jesus’ mercy remains active at the cross and beyond.'),
  makeLesson(96, 'true-passover-lamb', 'True Passover Lamb', 'Passion', 'Exodus 12', '1 Corinthians 5:7; John 1:29', 'The Passover pattern finds its ultimate fulfillment in Christ.', 'Jesus is the greater deliverance sacrifice.'),
  makeLesson(97, 'buried-with-the-rich', 'Buried with the Rich', 'Passion', 'Isaiah 53:9', 'Matthew 27:57–60', 'Though condemned like the wicked, the servant is buried with the rich.', 'Jesus is buried in the tomb of a wealthy man.'),
  makeLesson(98, 'holy-one-will-not-see-decay', 'Holy One Will Not See Decay', 'Resurrection', 'Psalm 16:10', 'Acts 2:25–32; Acts 13:35–37', 'God will not abandon His Holy One to decay.', 'The apostles preach this as a resurrection prophecy fulfilled in Jesus.'),
  makeLesson(99, 'lives-after-suffering', 'Lives After Suffering', 'Resurrection', 'Isaiah 53:10–11', 'Luke 24:6; Acts 2:31', 'The servant sees life after being crushed.', 'The resurrection shows that the suffering servant’s work truly succeeds.'),
  makeLesson(100, 'seated-at-gods-right-hand', 'Seated at God’s Right Hand', 'Resurrection', 'Psalm 110:1', 'Acts 2:33–36; Hebrews 1:3', 'The Lord invites the exalted one to sit at His right hand.', 'Jesus reigns now as the risen and ascended Lord.'),
];

export const firstTenLessons = prophecies.slice(0, 10);