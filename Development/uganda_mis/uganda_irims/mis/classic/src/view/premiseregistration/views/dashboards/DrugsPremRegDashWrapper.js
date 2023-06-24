/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.DrugsPremRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'drugspremregdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugspremregdash'
        }
    ]
});