<template>
    <div>
      <h1>About Stratagem</h1>
      <h2>Version 8.0 &copy; 2004</h2>
      <form name="AboutGameFrm" id="AboutGameFrm">
        <div style="width: 560px;">
          <Article>
            <p>
              STRATAGEM is a computer-assisted, role-playing game that conveys a variety
              of lessons. It helps participants understand the complexities of sustainable
              regional development, team work, system dynamics, and decision making under
              conditions of uncertainty. It was created by Dennis Meadows, Donella Meadows,
              and Norman Marshall during their fellowships at the International Institute
              for Applied Systems Analysis in Laxenburg, Austria in 1984. A visit to
              IIASA by Professor Richard Duke at a key moment of the project gave our
              team invaluable insights about the design of the board.
            </p>
          </Article>
  
          <Article>
            <p>
              Since its creation thousands of STRATAGEM sets have been manufactured.
              They are in use today in numerous languages and over twenty countries.
              It is a very versatile training tool. The game has been used in sessions
              for children as young as 16, for high school and university students, public
              officials, corporate managers, foundation officers, and senior personnel
              in international organizations.
            </p>
          </Article>
  
          <Article>
            <p>
              The current version was programmed by Michael Gildersleeve. Earlier versions
              were programmed by Ferenc Toth, Dennis Meadows, Thomas Fiddaman, Elzbieta
              Naumienko, and others.
            </p>
          </Article>
  
          <Article>
            <p>
              A useful session of the game generally requires 5-10 players per board,
              1-2 for each of the five sectors. Up to six games may be run simultaneously
              on one computer, allowing a session for groups up to 60 to be conducted
              with one machine.
            </p>
          </Article>
  
          <Article>
            <p>
              A game session requires 20-40 minutes for introduction, approximately
              three hours for play, and an hour or more for debriefing. However, the
              session may be broken into several segments. Play of the game may be interrupted
              and then resumed later.
            </p>
          </Article>
  
          <Article>
            <p>
              In addition to this software you will require for playing the game: a
              board showing the movement of goods, food, energy, and money across the
              five sectors. You need also a set of coins and pawns to represent the various
              physical stocks and flows in the game. Players in each of the five sectors
              require their own role description and decision sheet. The facilitator
              requires a computer, this software, an appropriate browser, a printer,
              a flip chart for posting results, and perhaps an LCD projector and screen.&nbsp;
            </p>
          </Article>
  
          <Article>
            <p>
              STRATAGEM, Ltd. game sets may be purchased from the Sustainability Institute,
              3 Linden Road, Hartland, VT, 05048. (Telephone: 001-802-436-1277 ext.
              105)
            </p>
            <p>
              Normally they are bought four at a time, so that a session may be organized for
              groups up to 40.
            </p>
          </Article>
  
          <Article>
            <p>
              For purchase information, contact Diana Wright, Publications Manager of
              the Institute:<br />
              &nbsp;&nbsp;&nbsp;&nbsp; <a href="mailto:DWright@sustainer.org">DWright@sustainer.org</a> <br />
              or consult the Institute&rsquo;s web site: <br />
              &nbsp;&nbsp;&nbsp;&nbsp; <a href="http://www.sustainer.org/tools_resources/games.html">http://www.sustainer.org/tools_resources/games.html</a>
            </p>
          </Article>
  
          <Article>
            <p>
              Other games and related books are also available from the Sustainability
              Institute. If you have technical questions about the game or suggestions
              for how it could be improved, contact Dennis Meadows: <br />
              &nbsp;&nbsp;&nbsp;&nbsp; <a href="mailto:lilgames@aol.com">lilgames@aol.com</a>
            </p>
          </Article>
  
          <h3><strong>Warning</strong></h3>
          <Article>
            <p>
              The developers and publisher of this game have done their best to eliminate
              errors and make the game robust and user-friendly. But, obviously, not
              all computers, all browsers, and all printers will be able to use this
              software free of problems.
            </p>
          </Article>
  
          <Article>
            <p>
              Therefore, anyone who intends to use
              this software must assume personal responsibility for testing it early
              enough to ensure that it runs adequately on the specific computer, browser
              software, and printer that will be used in the session.
            </p>
          </Article>
  
          <Article>
            <p>
              Until you
              have successfully executed several rounds on the specific machines
              you intend to use in your session, you should assume that you could have
              difficulties. Please plan ahead! &nbsp;
            </p>
          </Article>
  
          <Article>
            <p>
              Skilful use of this game in an
              educational program can make it the source of important insights and
              new skills for the participants. Inadequate preparation can lead to a
              frustrating game session for all those involved - participants and facilitator
              alike.
            </p>
          </Article>
  
          <Article>
            <p>
              Users
              must decide for themselves whether or not STRATAGEM is an appropriate
              teaching tool. We specifically eschew any responsibility for problems
              that may arise from its use.
            </p>
          </Article>
  
          <Article>
            <p>
              I wish you great success in using
              this simulation with many different groups. &nbsp;
            </p>
          </Article>
  
          <Article>
            <p>
              Dennis Meadows<br />
              Durham
              , NH, USA<br />
              December 20, 2005
            </p>
          </Article>
  
          <div>
            <Button @click="proceed">Create Teams</Button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import Header from './Header.vue';
  import Footer from './Footer.vue';
  import Article from './Article.vue';
  import Button from './Button.vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const proceed = () => {
    router.push('/createTeams'); 
  };
  </script>
  
  <style scoped>
  div {
    margin-bottom: 1.5em;
  }
  
  h1 {
    margin-bottom: 0.5em;
  }
  
  h2 {
    font-size: 1.2em;
    color: #555;
    margin-bottom: 1em;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  h3 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  
  /* Responsives Layout (einfaches Beispiel) */
  @media (max-width: 600px) {
    div[style*="width: 560px;"] {
      width: 95%;
    }
  }
  </style>