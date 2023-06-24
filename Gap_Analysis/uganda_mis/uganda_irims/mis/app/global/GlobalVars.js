/**
 * Created by Kip on 7/3/2018.
 */
Ext.define('Admin.global.GlobalVars', {

    singleton: true,
    extVersion: Ext.getVersion(),

    checkForProcessVisibility: function (permission_identifier) {
        var visibility = 0;//default
        if (permission_identifier == 'actual_delete' || permission_identifier === 'actual_delete') {
            visibility = 1;//default for actual deletion process
        }
        if (nonMenusArray[permission_identifier]) {
            visibility = nonMenusArray[permission_identifier];
            if (visibility == 2 || visibility === 2) {//full access
                visibility = 0;
            } else {
                visibility = 1;
            }
        }
        return !!parseInt(visibility);
    }

});