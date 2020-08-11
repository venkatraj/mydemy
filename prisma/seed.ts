const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

main();

async function main() {
  const users = [
    {
      email: 'raj@venkat.me',
      password: 'mypass',
      name: 'Venkat Raj',
      role: 'Admin',
    },
    {
      email: 'priya@venkat.me',
      password: 'mypass',
      name: 'Sri Priya',
      role: 'Instructor',
    },
    {
      email: 'thamarai@venkat.me',
      password: 'mypass',
      name: 'Thamarai Selvi',
      role: 'Instructor',
    },
    {
      email: 'shamitha@venkat.me',
      password: 'mypass',
      name: 'Shamitha',
    },
    {
      email: 'emeatcher4@seesaa.net',
      password: 'xeqP3z',
      name: 'Elspeth Meatcher',
    },
    {
      email: 'mclipsham5@qq.com',
      password: 'az1abC4',
      name: 'Maggi Clipsham',
    },
    {
      email: 'dpaulot6@europa.eu',
      password: 'KgQR2rlZN',
      name: 'Debbi Paulot',
    },
    {
      email: 'lfergie7@google.co.jp',
      password: '6VPbifvbgk',
      name: 'Libbey Fergie',
    },
    {
      email: 'msottell8@skype.com',
      password: '2cWExS1g',
      name: 'Megan Sottell',
    },
    {
      email: 'afawlks9@google.ru',
      password: 'eveYnM7',
      name: 'Ann Fawlks',
    },
  ];

  // Could use Promise.all
  // Sequential here so that world IDs match the array order above

  const courses = [
    {
      title: 'Modern Javascript',
      description:
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
    },
    {
      title: 'NodeJS Complete Course',
      description:
        'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
    },
    {
      title: 'GraphQL Bootcamp',
      description:
        'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    },
  ];

  for (const user of users) {
    await db.user.create({ data: user });
  }

  for (const course of courses) {
    await db.course.create({ data: course });
  }

  db.$disconnect();
}
