class GithubUsers {
  static search(username){
    const endpoint = `https://api.github.com/users/${username}`


    return fetch(endpoint).then(data => data.json())
    .then(({login, name,public_repos, followers}) => ({
      name,
      login,
      public_repos,
      followers
    }))
  }
}


export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  
  }

  async add(username){
    try{
      const userExist = this.entries.find(entry => entry.longin == username.longin)
      if (userExist){
        throw new Error('Usuário já cadastrado');
      }

    
      const user = await GithubUsers.search(username)
      console.log(user)
      if (user.login == undefined){
        throw new error('Usuário não encontrado');
      }

      this.entries =[user,...this.entries]
      this.update()
      this.save()
    } catch(e){
      alert(e.message)
  }
}


  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites :')) || []
  }

  save() {
    localStorage.setItem('@github-favorites :',JSON.stringify(this.entries))
  }

  delete(user) {
    const filteredEntries = this.entries.filter((entry) =>
        entry.login !== user.login    )

    this.entries = filteredEntries
    console.log(this.entries)
    this.update()
    this.save()
  }

}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
    this.onAdd()
  }

  onAdd() {
    const button = this.root.querySelector('.search button')
    button.onclick = () => {
      const {value} = this.root.querySelector('.search input')
      this.add(value)
    }

   
  }


  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user p').textContent = `${user.name}`
      row.querySelector('.user span').textContent = `${user.login}`
      row.querySelector('.user a').href =`https://github.com/${user.login}`
      row.querySelector('.repositories').textContent = `${user.public_repos}`
      row.querySelector('.followers').textContent = `${user.followers}`
      row.querySelector('.remove').onclick = () => {
        this.delete(user)
      }
      this.tbody.append(row)
    })
   
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = ` <tr>
    <td class="user">
      <img src="https://github.com/matheus2049alves.png" alt="foto de perfil do github">
      <a href="https://github.com/matheus2049alves" target="_blank">
        <p>Matheus Costa</p>
        <span>matheus2049alves</span>
      </a>
    </td>
    <td class="repositories">64</td>
    <td class="followers">4</td>
    <td><button class="remove">&times;</button></td>
 
     </tr> 
    `

    return tr
    
  }

  removeAllTr(){
     

    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    });
  }
}