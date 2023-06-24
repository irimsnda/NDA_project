/**
 * Created by Kip on 5/16/2019.
 */
Ext.define('Admin.overrides.AjaxTimeOutOverride', {
    override: 'Ext.data.proxy.Ajax',
    timeout: 300000,//microseconds 1sec=1000micro....5mins
    constructor: function() {
        delete this.timeout;
        this.callParent(arguments);
    }
});