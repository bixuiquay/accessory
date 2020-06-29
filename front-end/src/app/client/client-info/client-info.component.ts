// TODO: Feature Componetized like CrisisCenter
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, combineLatest } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-client-info",
  templateUrl: "./client-info.component.html",
  styleUrls: ["./client-info.component.css"],
})
export class ClientInfoComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

}
