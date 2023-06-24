/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.unstructured.UnStructuredPmsLabAnalysis', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsLabAnalysis',
    xtype: 'unstructuredpmslabanalysis',

    items: [
        {
            xtype: 'unstructuredpmslabanalysiswizard'
        }
    ]
});