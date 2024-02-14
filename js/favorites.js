export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }


  load(){
    this.entries = [ 
      {
      login : 'matheus2049alves',
      name : 'Matheus Costa',
      public_repos: '75',
      followers : '3'
      }, 

      {
        login : 'DiogoBrasil',
        name : 'Diogo Brasil',
        public_repos: '85',
        followers : '3'
      }
    ]
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
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