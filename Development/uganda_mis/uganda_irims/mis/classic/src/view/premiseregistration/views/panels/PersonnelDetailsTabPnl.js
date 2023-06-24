/**
 * Created by Kip on 11/8/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PersonnelDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'personneldetailstabpnl',
    height: 450,
    frame: true,
    listeners: {
        beforetabchange: function (tabPnl, newTab) {
            var id = tabPnl.down('hiddenfield[name=id]').getValue();
            if (tabPnl.items.indexOf(newTab) > 0) {
                if (id < 1) {
                    toastr.warning('Save personnel basic information first!!', 'Warning Response');
                    return false;
                }
            }
        }
    },
    items: [
        {
            title: 'Basic Info',
            xtype: 'personnelbasicinfofrm'
        },
        {
            title: 'Qualifications',
            xtype: 'personnelqualificationsgrid'
        },
        {
            title: 'Documents',
            xtype: 'premisepersonneldocsgrid'
        },
        {
            title: 'Premise Personnel',
            xtype: 'premisepersonneldetailsfrm'
        }
    ]
});