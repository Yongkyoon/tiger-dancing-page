export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>🐯 정글의 호랑이</h1>
        <p>호랑이를 누르면 “어흥!” 하고 포효해요</p>
      </header>
      <main className="layout-main">{children}</main>
      <footer className="layout-footer">
        <small>단축키 · Space 재생/정지 · 1~4 동작 · R 포효 · M 소리 · +/− 속도</small>
      </footer>
    </div>
  )
}
