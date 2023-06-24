/**
 * Created by Kip on 4/29/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.LegalityOfStockPrdFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'legalityofstockprdfrm',
    controller: 'premiseregistrationvctr',
    bodyPadding: 5,
    layout: 'column',
    frame: true,
    defaults:{
        margin: 5,columnWidth: 0.5,
        allowBlank: false,
        labelAlign: 'top',
        labelStyle: 'font-weight:bold'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'inspection_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Existence of Illegal Stocked Products',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            name: 'has_illegal_stock',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'textfield',
            name:'legalitystock_remarks',
            fieldLabel:'Remarks'
        }
    ],
    buttons:[
        {
            xtype: 'button',
            text: 'Save Legality Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            isCloseWin: false,
            action_url: 'premiseregistration/saveLegalityofStockprdRemarks',
            table_name: 'tra_premiseinspection_inspectors',
            handler: 'saveLegalityofStockprdRemarks'
        }
    ]
});