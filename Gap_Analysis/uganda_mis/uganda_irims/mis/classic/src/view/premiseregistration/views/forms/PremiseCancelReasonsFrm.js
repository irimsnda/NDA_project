/**
 * Created by Kip on 5/3/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PremiseCancelReasonsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisecancelreasonsfrm',
    controller: 'premiseregistrationvctr',
    layout: 'form',
    frame: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Reason',
            name: 'reason_id',
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_premise_cancellationreasons'
                            }
                        }
                    },
                    isLoad: true
                },
            }
        },
        {
            xtype: 'textarea',
            name: 'remark',
            fieldLabel: 'Remark'
        }
    ],
    buttons:[
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            action_url: 'premiseregistration/savePremiseCancellationReason',
            handler: 'doCreatePremiseRegParamWin',
            storeID: 'premisecancelreasonsstr',
            table_name: 'tra_premise_cancellationreasons'
        }
    ]
});