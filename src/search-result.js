const template = document.createElement('template');
template.innerHTML = `
<style>
:host{
    display: block;
    background-color: #404040;
    color: #ffffff;
}
#searchResult {
    border: 1px solid black;
}
</style>
<div id="searchResult" style="margin-top: 5px;">
    <img id="summonerIcon" src="" alt="icon" style="float: left; width: 72px; height: 72px;">
    <div id="name"></div>
    <div id="level"></div>
    <div id="rank"></div>
</div>
<div style="clear: both;"></div>
`;

class SearchResult extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.summName = '';
    this.imgSource = '';
    this.summLevel = '';
    this.summRank = '';

    this.name = this.shadowRoot.querySelector('#name');
    this.summonerIcon = this.shadowRoot.querySelector('#summonerIcon');
    this.level = this.shadowRoot.querySelector('#level');
    this.rank = this.shadowRoot.querySelector('#rank');
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.name.innerHTML = this.summName;
    this.summonerIcon.src = this.imgSource;
    this.level.innerHTML = `Level: ${this.summLevel}`;
    this.rank.innerHTML = this.summRank;
  }
}

customElements.define('search-result', SearchResult);
