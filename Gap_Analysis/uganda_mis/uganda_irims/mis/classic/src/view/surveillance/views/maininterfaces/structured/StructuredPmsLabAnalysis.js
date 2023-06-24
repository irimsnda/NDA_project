/**
 * Created by Kip on 3/16/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredPmsLabAnalysis', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsLabAnalysis',
    xtype: 'structuredpmslabanalysis',

    items: [
        {
            xtype: 'structuredpmslabanalysiswizard'
        }
    ]
});