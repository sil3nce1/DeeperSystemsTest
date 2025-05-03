
const DS_STRING_ORIGINAL = "This is a Test App";
const DS_STRING_MODIFIED = "This text is currently being hooked";

Java.perform(function() {
    var Resources = Java.use('android.content.res.Resources');

    Resources.getText.overload('int').implementation = function(resourceId) {
         var originalString = this.getString(resourceId);

        if (originalString === DS_STRING_ORIGINAL) {
            var StringJava = Java.use('java.lang.String');
            return StringJava.$new(DS_STRING_MODIFIED);
        }

        return this.getText(resourceId);
    };
});