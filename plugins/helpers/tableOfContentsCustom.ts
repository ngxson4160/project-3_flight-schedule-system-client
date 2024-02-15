import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import TableOfContentIcon from '~/assets/images/table-of-content.svg';

type THeading = {
  id: string;
  label: string;
  model: string;
  level: number;
};

export default class TableOfContentsCustom extends Plugin {
  afterInit() {
    const editor = this.editor;
    const conversion = editor.conversion;
    const schema = editor.model.schema;

    const headings = editor.config.get('heading').options;

    this._setupConversion(conversion, schema, headings);

    editor.ui.componentFactory.add('tableOfContentsCustom', (locale) => {
      const view = new ButtonView(locale);
      const t = editor.t;

      view.set({
        label: t('Table of contents'),
        icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 19a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8.022a6.47 6.47 0 0 0-1.5-.709V2a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h6.313c.173.534.412 1.037.709 1.5H3Z"/><path d="M9.174 14a6.489 6.489 0 0 0-.155 1H6v-1h3.174Z"/><path d="M10.022 12c-.202.316-.378.65-.524 1H4v-1h6.022Z"/><path d="M12.034 10c-.448.283-.86.62-1.224 1H6v-1h6.034Z"/><path d="M12 4v1H4V4h8Z"/><path d="M14 7V6H6v1h8Z"/><path d="M15 9V8H7v1h8Z"/><path clip-rule="evenodd" d="M20 15.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM15.5 13a.5.5 0 0 0-.5.5V15h-1.5a.5.5 0 0 0 0 1H15v1.5a.5.5 0 0 0 1 0V16h1.5a.5.5 0 0 0 0-1H16v-1.5a.5.5 0 0 0-.5-.5Z"/></svg>
        `,
        tooltip: true,
      });

      view.on('execute', () => {
        const root = editor.model.document.getRoot();
        const range = editor.model.createRangeIn(root);

        const headerIds: THeading[] = [];

        for (const value of range.getWalker({ ignoreElementEnd: true })) {
          if (
            value.item.is('element') &&
            value.item.name.match(/^heading/) &&
            value.item.getChild(0)?._data
          ) {
            headerIds.push({
              id: value.item.getAttribute('id') as string,
              label: value.item.getChild(0)?._data,
              model: value.item.name,
              level: Number.parseInt(value.item.name.replace(/^heading/, '')),
            });
          }
        }

        const bulletedListNestedHTML =
          '<p>&nbsp;</p>' +
          generateBulletedListNestedHTML(headerIds) +
          '<p>&nbsp;</p>';

        const viewFragment = editor.data.processor.toView(
          bulletedListNestedHTML,
        );
        const modelFragment = editor.data.toModel(viewFragment);

        editor.model.insertContent(modelFragment);
      });

      return view;
    });
  }

  _setupConversion(conversion, schema, headings) {
    conversion.attributeToAttribute({ model: 'id', view: 'id' });

    for (const heading of headings) {
      if (heading.model.match(/^heading/)) {
        schema.extend(heading.model, { allowAttributes: ['id'] });

        conversion.for('downcast').add((dispatcher) => {
          dispatcher.on(
            `insert:${heading.model}`,
            (evt, data, conversionApi) => {
              const modelElement = data.item;

              const id =
                modelElement.getAttribute('id') ||
                `header-${Math.floor(Math.random() * 10000)}`;
              conversionApi.writer.setAttribute(
                'id',
                id,
                conversionApi.mapper.toViewElement(modelElement),
              );
              conversionApi.writer.setAttribute('id', id, modelElement);
            },
            { priority: 'low' },
          );
        });
      }
    }
  }
}

const generateBulletedListNestedHTML = (headings: THeading[]) => {
  let html = '';
  let level = 0;

  headings.forEach((heading) => {
    const { id, label, level: openLevel } = heading;

    while (openLevel > level) {
      html += '<ul>';
      level++;
    }

    while (openLevel < level) {
      html += '</ul>';
      level--;
    }

    html += `<li><span class="ck-list-bogus-paragraph"><a href="#${id}">${label}</a></span></li>`;
  });

  while (level > 0) {
    html += '</ul>';
    level--;
  }

  return html;
};
