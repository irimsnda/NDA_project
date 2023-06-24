/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.VeterinaryPremisesDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'veterinarypremisesdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'veterinarypremisesdash'
        }
    ]
});