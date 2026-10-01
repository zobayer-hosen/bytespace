/**
 * Every image the site uses lives here so the Figma exports can replace the placeholders in one place.
 * Photos are Unsplash placeholders; the two cut-out portraits are local files in /public/images/people.
 */

function photo(id: string, width = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

function portrait(id: string) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=160&h=160&q=80`;
}

export const media = {
  people: {
    student: "/images/people/student.webp",
    creator: "/images/people/creator.webp",
  },
  courses: {
    figma: photo("1581291518857-4e27b48ff24e"),
    digitalAsset: photo("1626785774573-4b799315345d"),
    bigData: photo("1551288049-bebda4e38f71"),
    productivity: photo("1499951360447-b19be8fe80f5"),
    money: photo("1611974789855-9c2a0a7236a3"),
    startup: photo("1552664730-d307ca884978"),
  },
  coursePreview: photo("1580894732444-8ecded7900cd", 1400),
  sneakPeek: [
    photo("1434030216411-0b793f4b4173", 400),
    photo("1559028012-481c04fa702d", 400),
    photo("1587614382346-4ec70e388b28", 400),
    photo("1586717791821-3f44a563fa4c", 400),
  ],
  learners: [
    portrait("1507003211169-0a1dd7228f2d"),
    portrait("1494790108377-be9c29b29330"),
    portrait("1546961329-78bef0414d7c"),
    portrait("1539571696357-5a69c17a67c6"),
    portrait("1548142813-c348350df52b"),
    portrait("1492562080023-ab3db95bfbce"),
    portrait("1573497019940-1c28c88b4f3e"),
    portrait("1531123897727-8f129e1688ce"),
  ],
  avatars: {
    purepearl: portrait("1599566150163-29194dcaad36"),
    sarah: portrait("1520813792240-56fc4a3765a7"),
    james: portrait("1560250097-0b93528c311a"),
    alex: portrait("1566492031773-4f4e44671857"),
    albert: portrait("1500648767791-00dcc994a43e"),
    cody: portrait("1570295999919-56ceb5ecca61"),
    brooklyn: portrait("1607746882042-944635dfe10e"),
  },
} as const;
