// Pass a string such as '%hello%' as the search argument to search for any text containing hello in the string argument, similar to SQL 'LIKE' operator
function searchLike(string, search) {
    if (typeof search !== 'string' || search.length <= 1 || this === null) {return false; }
    // Remove special chars
    search = '%' + search + '%';
    search = search.replace(new RegExp("([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-])", "g"), "\\$1");
    // Replace % and _ with equivalent regex
    search = search.replace(/%/g, '.*').replace(/_/g, '.');
    // Check matches
    return RegExp('^' + search + '$', 'gi').test(string);
}




