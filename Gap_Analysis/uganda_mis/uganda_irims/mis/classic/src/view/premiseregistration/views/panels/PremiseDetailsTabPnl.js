
Ext.define('Admin.view.premiseregistration.views.panels.PremiseDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'premisedetailstabpnl',
    itemId: 'premisedetailstabpnl',
    listeners: {
        beforetabchange: function (tabPnl, newTab) {
            var id = tabPnl.down('hiddenfield[name=premise_id]').getValue();
            if (tabPnl.items.indexOf(newTab) > 0) {
                if (id < 1) {
                    toastr.warning('Save Premise main details first!!', 'Warning Response');
                    return false;
                }
            }
        }
    },
    items: [
        {
            title: 'Premises Details',
            xtype: 'premisedetailsfrm'
        },
        {
            title: 'Staff Details',
            xtype: 'premisepersonneldetailsgrid'//'premisepersonneldetailsgrid'
        },
         {
            title: 'Particulars of Nearest Pharmancy',
            xtype: 'nearestpremiseparticulars'
        },

        {
            title: 'Premises Main Activities/Product Information',
            hidden: true,
            xtype: 'premiseotherdetailsgrid'
        },
        {
            title: 'Manufacturing Site Product Lines(for Manufacturers Only)',
            hidden: true,
            xtype: 'premisesproductlinedetailsgrid'
        }
        // {
        //     title: 'Personnel Details',
        //     xtype: 'premisepersonneltabpnl'//'premisepersonneldetailsgrid'
        // } ,

        
    ]
});