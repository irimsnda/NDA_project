/**
 * Created by Kip on 12/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.AmendedPremiseDetailsFrm', {
    extend: 'Admin.view.premiseregistration.views.forms.PremiseDetailsFrm',
    xtype: 'amendedpremisedetailsfrm',
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 4,
        labelAlign: 'top',
        allowBlank: false
    },
    listeners:{
        beforerender: function () {
            var countryFld = this.down('combo[name=country_id]'),
                store = countryFld.getStore();
            store.removeAll();
            store.load();
        }
    }
});