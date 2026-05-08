(() => {
    const input = document.getElementById('md-input');
    const output = document.getElementById('md-output');

    marked.setOptions({ breaks: true, gfm: true });

    function render() {
        output.innerHTML = marked.parse(input.value);
    }

    input.addEventListener('input', render);

    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const selected = input.value.substring(start, end);
            let insert = '';

            switch (action) {
                case 'bold': insert = '**' + (selected || 'bold text') + '**'; break;
                case 'italic': insert = '*' + (selected || 'italic text') + '*'; break;
                case 'heading': insert = '## ' + (selected || 'Heading'); break;
                case 'link': insert = '[' + (selected || 'link text') + '](url)'; break;
                case 'code': insert = '`' + (selected || 'code') + '`'; break;
                case 'list': insert = '- ' + (selected || 'list item'); break;
            }

            input.value = input.value.substring(0, start) + insert + input.value.substring(end);
            input.focus();
            input.selectionStart = input.selectionEnd = start + insert.length;
            render();
        });
    });

    document.getElementById('btn-copy-md').addEventListener('click', () => {
        navigator.clipboard.writeText(input.value);
    });

    document.getElementById('btn-copy-html').addEventListener('click', () => {
        navigator.clipboard.writeText(output.innerHTML);
    });

    document.getElementById('btn-clear').addEventListener('click', () => {
        input.value = '';
        output.innerHTML = '';
    });

    render();
})();
