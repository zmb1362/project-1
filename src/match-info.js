const template = document.createElement("template");
template.innerHTML = `
<style>
:host{
    display: block;
    background-color: #535bfa;
    color: #ffffff;
}
#matchInfo {
    border: 1px solid black;
}
</style>
<div id="matchInfo">
    <div style="float: left;">
        <img class="p-1" id="champIcon" src="" alt="icon">        
    </div>
    <div id="name"></div>
    <div id="champTitle"></div>
</div>
<div style="clear: both;"></div>
`;

class MatchInfo extends HTMLElement{
    constructor(){
      super();
      this.attachShadow({mode: "open"});
      
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.imgSource = "";
      this.champName = "";
      this.championTitle = "";

      this.matchInfo = this.shadowRoot.querySelector("#matchInfo");
      this.champIcon = this.shadowRoot.querySelector("#champIcon");
      this.name = this.shadowRoot.querySelector("#name");
      this.champTitle = this.shadowRoot.querySelector("#champTitle");
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.champIcon.src = this.imgSource;
        this.name.innerHTML = this.champName;
        this.champTitle.innerHTML = this.championTitle;
    }

    
} 
	
customElements.define('match-info', MatchInfo);