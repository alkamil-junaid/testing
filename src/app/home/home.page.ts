import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  x = 60;
  y = 0;
  title = 'Drag Me!';

  startX = 0;
  startY = 0;

  constructor(private localNotifications: LocalNotifications, private localNotification: PhonegapLocalNotification, private socialSharing: SocialSharing) {}

  ngOnInit(){
    // Schedule delayed notification
    // this.localNotifications.schedule({
    //   title: 'Local ILocalNotification Example',
    //   text: 'testing',
    //   trigger: {at: new Date(new Date().getTime() + 3600)},
    //   led: 'FF0000',
    //   sound: null,
    //   foreground: true
    // });

    this.localNotification.requestPermission().then(
      (permission) => {
        if (permission === 'granted') {
    
          // Create the notification
          this.localNotification.create('My Title', {
            tag: 'message1',
            body: 'My body\nNew line\n2nd Line',
            icon: 'assets/icon/favicon.ico',
            
          });
    
        }
      }
    );

    // Check if sharing via email is supported
this.socialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});

// Share via email
this.socialSharing.share('Body', 'Subject', ['recipient@example.org']).then(() => {
  // Success!
}).catch(() => {
  // Error!
});

  }

  onPress(event){
    console.log(event);
  }

  onPan(event: any): void {
    event.preventDefault();
    if(event.additionalEvent === 'pandown'){
      if(this.x > 60)
         this.x = this.x - 2.5;
    }
    else if(event.additionalEvent === 'panup'){
      if(this.x < 300)
         this.x = this.x + 2.5;
    }
  }
}
