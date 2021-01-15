import classNames from 'classnames';

function SectionItemForm({error, onChange, sections, sectionItem}) {
  return (
    <>
      {error && error.message && (
        <div className="alert alert-danger">{error.message}</div>
      )}
      <div className="mb-3">
        <label className="form-label" htmlFor="SectionId">Section</label>
        <select className="form-select" id="SectionId" name="SectionId" onChange={onChange} value={sectionItem.SectionId}>
          {sections.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
        </select>
        {error?.errorMessagesHTMLFor?.('SectionId')}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="title"><sup>*</sup>Title</label>
        <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('title')})} id="title" name="title" onChange={onChange} type="text" value={sectionItem.title} />
        {error?.errorMessagesHTMLFor?.('title')}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="subtitle">Subtitle</label>
        <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('subtitle')})} id="subtitle" name="subtitle" onChange={onChange} type="text" value={sectionItem.subtitle} />
        {error?.errorMessagesHTMLFor?.('subtitle')}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="place">Place</label>
        <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('place')})} id="place" name="place" onChange={onChange} type="text" value={sectionItem.place} />
        {error?.errorMessagesHTMLFor?.('place')}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="about">About</label>
        <textarea className={classNames('form-control', {'is-invalid': error?.errorsFor?.('about')})} id="about" name="about" onChange={onChange} value={sectionItem.about}></textarea>
        {error?.errorMessagesHTMLFor?.('about')}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="startedAt"><sup>*</sup>Started at</label>
        <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('startedAt')})} id="startedAt" name="startedAt" onChange={onChange} pattern="[0-9]{4}-[0-9]{2}" placeholder="YYYY-MM" type="month" value={sectionItem.startedAt} />
        {error?.errorMessagesHTMLFor?.('startedAt')}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="endedAt">Ended at</label>
        <input className={classNames('form-control', {'is-invalid': error?.errorsFor?.('endedAt')})} id="endedAt" name="endedAt" onChange={onChange} pattern="[0-9]{4}-[0-9]{2}" placeholder="YYYY-MM" type="month" value={sectionItem.endedAt} />
        {error?.errorMessagesHTMLFor?.('endedAt')}
      </div>
    </>
  );
}

export default SectionItemForm;
