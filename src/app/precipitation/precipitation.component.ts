import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.scss']
})
export class PrecipitationComponent implements OnInit {
  readonly officialRadarUrl = 'https://wetter.provinz.bz.it/de/radar-blitze-und-satellit';

  ngOnInit(): void {
  }
}
