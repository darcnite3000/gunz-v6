import React from 'react';
import TabButtons from '../TabButtons';

class OurSites extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gaySites: [
        {
          link: 'http://www.AmateursDoIt.com',
          image: 'assets/images/sitelist_Amateurs Do It.jpg',
          title: 'Amateurs Do It',
          remote: true,
        },
        {
          link: 'http://www.WankOffWorld.com',
          image: 'assets/images/sitelist_Wank Off World.jpg',
          title: 'Wank Off World',
          remote: true,
        },
        {
          link: 'http://www.GayPhotoAlbum.com',
          image: 'assets/images/sitelist_Gay Photo Album.jpg',
          title: 'Gay Photo Album',
          remote: true,
        },
        {
          link: 'http://www.HotBarebacking.com',
          image: 'assets/images/sitelist_Hot Barebacking.jpg',
          title: 'Hot Barebacking',
          remote: true,
        },
        {
          link: 'http://www.BangBangBoys.com',
          image: 'assets/images/sitelist_Bang Bang Boys.jpg',
          title: 'Bang Bang Boys',
          remote: true,
        },
        {
          link: 'http://www.Twinks.com',
          image: 'assets/images/sitelist_Twinks.jpg',
          title: 'Twinks.com',
          remote: true,
        },
        {
          link: 'http://www.ThugOrgy.com',
          image: 'assets/images/sitelist_Thug Orgy.jpg',
          title: 'Thug Orgy',
          remote: true,
        },
        {
          link: 'http://www.DarkThunder.com',
          image: 'assets/images/sitelist_Dark Thunder.jpg',
          title: 'Dark Thunder',
          remote: true,
        },
        {
          link: 'http://www.StagHomme.com',
          image: 'assets/images/sitelist_Stag Homme Studios.jpg',
          title: 'Stag Homme Studios',
          remote: true,
        },
        {
          link: 'http://www.TylersRoom.com',
          image: 'assets/images/sitelist_Tylers Room.jpg',
          title: 'Tyler\'s Room',
          remote: true,
        },
        {
          link: 'http://www.TribalTwinks.com',
          image: 'assets/images/sitelist_Tribal Twinks.jpg',
          title: 'Tribal Twinks',
          remote: true,
        },
        {
          link: 'http://www.FreshSX.com',
          image: 'assets/images/sitelist_Fresh SX.jpg',
          title: 'Fresh SX',
          remote: true,
        },
        {
          link: 'http://www.IronLockup.com',
          image: 'assets/images/sitelist_Iron Lockup.jpg',
          title: 'Iron Lockup',
          remote: true,
        },
        {
          link: 'http://www.ClubJasonSparks.com',
          image: 'assets/images/sitelist_Club Jason Sparks.jpg',
          title: 'Club Jason Sparks',
          remote: true,
        },
        {
          link: 'http://www.DirtyBoySociety.com',
          image: 'assets/images/sitelist_Dirty Boy Society.jpg',
          title: 'Dirty Boy Society',
          remote: true,
        },
        {
          link: 'http://www.JasonSparksLive.com',
          image: 'assets/images/sitelist_Jason Sparks Live.jpg',
          title: 'Jason Sparks Live',
          remote: true,
        },
        {
          link: 'http://www.DadsFuckLads.com',
          image: 'assets/images/sitelist_Dads Fuck Lads.jpg',
          title: 'Dads Fuck Lads',
          remote: true,
        },
        {
          link: 'http://www.TeensAndTwinks.com',
          image: 'assets/images/sitelist_Teens And Twinks.jpg',
          title: 'Teens And Twinks',
          remote: true,
        },
        {
          link: 'http://www.CazzoClub.com',
          image: 'assets/images/sitelist_Cazzo Club.jpg',
          title: 'Cazzo Club',
          remote: true,
        },
        {
          link: 'http://www.WurstfilmClub.com',
          image: 'assets/images/sitelist_WurstFilm Club.jpg',
          title: 'Wurstfilm Club',
          remote: true,
        },
        {
          link: 'http://www.Gay-Fetish',
          image: 'assets/images/sitelist_Gay-Fetish-Porn.jpg',
          title: 'Gay-Fetish-Porn',
          remote: true,
        },
        {
          link: 'http://www.JalifStudio.com',
          image: 'assets/images/sitelist_Jalif Studio.jpg',
          title: 'Jalif Studio',
          remote: true,
        },
        {
          link: 'http://www.BadBoyBondage.com',
          image: 'assets/images/sitelist_Bad Boy Bondage.jpg',
          title: 'Bad Boy Bondage',
          remote: true,
        },
        {
          link: 'http://www.BadBoysBootcamp.com',
          image: 'assets/images/sitelist_Bad Boys Bootcamp.jpg',
          title: 'Bad Boys Bootcamp',
          remote: true,
        },
      ],
      shemaleSites: [
        {
          link: 'http://www.UltimateTGirl.com',
          image: 'assets/images/sitelist_Ultimate T-Girl.jpg',
          title: 'Ultimate TGirl',
          remote: true,
        },
        {
          link: 'http://www.ShemaleCandy.com',
          image: 'assets/images/sitelist_Shemale Candy.jpg',
          title: 'Shemale Candy',
          remote: true,
        },
        {
          link: 'http://www.TrannyPoppers.com',
          image: 'assets/images/sitelist_Tranny Poppers.jpg',
          title: 'Tranny Poppers',
          remote: true,
        },
        {
          link: 'http://www.BarebackSheBang.com',
          image: 'assets/images/sitelist_Bareback SheBang.jpg',
          title: 'Bareback SheBang',
          remote: true,
        },
        {
          link: 'http://www.UTGPass.com',
          image: 'assets/images/sitelist_UTG Pass.jpg',
          title: 'UTG Pass',
          remote: true,
        },
      ]
    }
  }
  render(){
    return (
    <section className="content page-container">
      <header>
        <h1>Our Sites</h1>
      </header>
      <div className="shell">
        <div className="quoter">
          <p className="quoter-column">
            Designed from the ground up to help you efficiently get what you need and get back to work,
            Gunzblazing recognises how valuable your time is and how hard you work.
            Over the last 12 years many of our innovations have been copied and become
            standard but we still strive to stand out where it matters - payouts,
            conversions, tools, stability and communication.
          </p>
          <p className="quoter-column">
            We're here stronger than ever because we do the right things and focus on
            everyone making money as efficiently as possible. No fuss, no hassle, just
            1.2 decades of payouts with a helping hand whenever you need it.
            We are webmasters, we are here for your success.
            Sign Up and make money with us today.
          </p>
        </div>
        <TabButtons title="Gay Sites" tabs={this.state.gaySites} />
        <TabButtons title="Shemale Sites" tabs={this.state.shemaleSites} />
      </div>
    </section>
    );
  }
}

export default OurSites;