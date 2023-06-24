/**
 * Created by Kip on 2/8/2019.
 */
Ext.define('Admin.view.commoninterfaces.AppInvoiceManualGenerationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'appinvoicemanualgenerationpnl',
    itemId: 'appinvoice_gen',
    layout: 'border',
    items: [ {
        title: 'Cost Elements',
        region: 'center',
        layout: 'vbox',
        items: [
            {
                xtype: 'invoicingcostelementsgrid',
                flex: 1
            },
            {
                xtype: 'toolbar',
                ui: 'footer',
                height: 45,
                width: '100%',
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isLocked'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Paying Currency',
                        labelWidth: 120,
                        labelStyle: 'font-weight:bold',
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        }
                    },
                    {
                        xtype: 'combo',
                        name: 'paying_currency_id',
                        store: 'currenciesstr',
                        forceSelection: true,
                        displayField: 'name',
                        valueField: 'id',
                        queryMode: 'local',
                        emptyText: 'Select Paying Currency',
                        width: 240,
                        anyMatch: true,
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        },
                        listeners: {
                            beforerender: function () {
                                var store = this.getStore(),
                                filterObj = {is_paying_currency: 1},
                                    filterStr = JSON.stringify(filterObj);
                                store.removeAll();
                                store.load({params: {filters: filterStr}});
                            }
                        }
                    },
                    {
                        xtype: 'tbspacer',
                        width: 20
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'Is Fast Track',
                        name: 'is_fast_track',
                        inputValue: 1,
                        labelWidth: 90,
                        uncheckedValue: 2,
                        labelStyle: 'font-weight:bold'
                    },
                    '->',
                   
                    {
                        xtype: 'tbspacer',
                        width: 10
                    }
                ]
            },
            {
                xtype: 'invoicingcostdetailsgrid',
                flex: 0.9
            }
        ]
    }, {
        xtype: 'toolbar',
        ui: 'footer',
        region: 'south',
        height: 45,
        split: false,
        split: false,
        items: [{
            text: 'Remove Selected Items',
            ui: 'soft-purple',
            name: 'remove_selected',
            iconCls: 'fa fa-close',
            disabled: true
        },'->',{
            text: 'Generate/Confirm Invoice Details',
            ui: 'soft-purple',
            iconCls: 'fa fa-save',
            name: 'save_btn',
            toaster: 1,
            isLocked: 0,
            isSubmission: 0
        }]    
    }]
});