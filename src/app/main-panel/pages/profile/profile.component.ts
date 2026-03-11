import { Component } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [RouterLinkActive, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
