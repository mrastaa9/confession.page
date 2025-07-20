document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('confessionForm');
    const input = document.getElementById('confessionInput');
    const list = document.getElementById('confessionsList');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            const div = document.createElement('div');
            div.className = 'confession';
            div.textContent = text;
            list.prepend(div);
            input.value = '';
                }
            });
        });